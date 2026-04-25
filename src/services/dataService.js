import { sendOTPEmail, sendCredentialsEmail } from './emailService';
import { BACKEND_URL } from './config';
import { generateUniquePartyCode } from '../database/partyCode';
import { mockApiService } from '../database/mockApiService';
import { sharedDataService } from './sharedDataService';
import mainLogo from '../assets/UJJWALPAY_logo.png';
export { BACKEND_URL };

// ── Safe JSON parser: prevents "Unexpected end of JSON input" crashes ──────
// Always read as text first, then parse. Returns fallback on empty/invalid body.
async function safeJson(res, fallback = {}) {
    try {
        const text = await res.text();
        if (!text || text.trim() === '') return fallback;
        return JSON.parse(text);
    } catch {
        return fallback;
    }
}

// Environment-based toggle: Use real backend on localhost, localstorage in production
const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' || 
     window.location.hostname.startsWith('192.168.'));
const useLocalOnly = typeof window !== 'undefined' && localStorage.getItem('UjjwalPay_use_local_only') === 'true';

const normalizeRoleForBackend = (role) => {
    const raw = String(role || '').trim().toLowerCase();
    if (raw === 'retailer' || raw === 'retailers') return 'retailer';
    if (raw === 'distributor' || raw === 'distributors') return 'distributor';
    if (raw === 'super distributor' || raw === 'super_distributor' || raw === 'super-distributor' || raw === 'superadmin' || raw === 'super admin') return 'super_distributor';
    // Existing app roles often come in uppercase enum-like values
    if (raw === 'retailer'.toUpperCase().toLowerCase()) return 'retailer';
    if (raw === 'distributor'.toUpperCase().toLowerCase()) return 'distributor';
    if (raw === 'super_distributor'.toUpperCase().toLowerCase()) return 'super_distributor';
    return raw || 'retailer';
};

const normalizeRoleForClient = (role) => {
    const raw = normalizeRoleForBackend(role);
    if (raw === 'retailer') return 'RETAILER';
    if (raw === 'distributor') return 'DISTRIBUTOR';
    if (raw === 'super_distributor') return 'SUPER_DISTRIBUTOR';
    return String(role || 'RETAILER').trim().toUpperCase();
};

function userMatchesIdentifier(user, identifier) {
    if (!user || identifier == null || String(identifier).trim() === '') return false;
    const id = String(identifier);
    return [user._id, user.id, user.username, user.mobile, user.loginId]
        .filter((v) => v != null && String(v).trim() !== '')
        .some((v) => String(v) === id);
}


export const dataService = {
    // --- AUTH & LOGIN ---
    requestRegistration: async function (data) {
        const username = data.mobile || data.email;
        const normalizedRole = normalizeRoleForBackend(data.role);
        const newUser = {
            ...data,
            username: username,
            role: normalizedRole,
            status: 'pending',
            balance: '0.00',
            id: 'REQ-' + Math.floor(1000 + Math.random() * 9000),
            latitude: data.latitude || null,
            longitude: data.longitude || null
        };

        if (useLocalOnly) {
            const localData = this.getData();
            if (!localData.users.find(u => u.username === username)) {
                localData.users.push(newUser);
                this.saveData(localData);
            }
            return { success: true, message: "Registration request submitted successfully.", registrationId: newUser.id };
        }

        const url = `${BACKEND_URL}/register`;
        console.log("Attempting Registration at:", url, "with payload:", newUser);
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            console.log("Registration Response Stats:", res.status, res.statusText);
            if (!res.ok) {
                const text = await res.text();
                console.error("Registration Error Response:", text);
                return { success: false, message: `Server error (${res.status}): ${text.substring(0, 100)}` };
            }
            return await safeJson(res, { success: false, message: "Response was not valid JSON" });
        } catch (e) {
            console.error("Registration Fetch Exception:", e);
            return { success: false, message: "Server connection failed: " + e.message };
        }
    },
    registerUser: async function (data, parentId = null) {
        const username = data.mobile || data.email;
        const normalizedRole = normalizeRoleForBackend(data.role);
        const newUser = {
            ...data,
            username: username,
            role: normalizedRole,
            parent_id: parentId,
            status: 'pending'
        };

        if (useLocalOnly) {
            const localData = this.getData();
            if (!localData.users.find(u => u.username === username)) {
                localData.users.push(newUser);
                this.saveData(localData);
            }
            return { success: true, message: "User registered successfully." };
        }

        const url = `${BACKEND_URL}/register`;
        console.log("Attempting Direct Register at:", url);
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            if (!res.ok) {
                return { success: false, message: `Server error (${res.status})` };
            }
            return await safeJson(res, { success: false, message: "Server connection failed: Invalid response" });
        } catch (e) {
            console.error("Direct Register Failed:", e);
            return { success: false, message: "Server connection failed: " + e.message };
        }
    },

    adminAddUser: async function (userData) {
        if (useLocalOnly) {
            const data = this.getData();
            const newUser = {
                id: Date.now(),
                username: userData.mobile,
                name: userData.name,
                role: userData.role,
                status: 'Approved',
                balance: '0.00'
            };
            data.users.push(newUser);
            this.saveData(data);
            return { success: true, message: "User added successfully." };
        }
        try {
            const token = localStorage.getItem('UjjwalPay_token');
            const res = await fetch(`${BACKEND_URL}/admin/add-user`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: userData.mobile,
                    password: userData.password,
                    fullName: userData.name,
                    phone: userData.mobile,
                    email: userData.email,
                    role: userData.role,
                    shopName: userData.businessName,
                    territory: userData.state,
                    pin: userData.pin,
                    partyCode: userData.partyCode
                })
            });
            return await res.json();
        } catch (e) {
            return { success: false, message: "Server connection failed" };
        }
    },

    loginUser: async function (username, password, location = null, expectedPortalRole = null) {
        const expected = normalizeRoleForClient(expectedPortalRole);
        const isRoleAllowedForPortal = (role) => {
            if (!expectedPortalRole) return true;
            const normalized = normalizeRoleForClient(role);
            if (expected === 'DISTRIBUTOR') {
                return normalized === 'DISTRIBUTOR';
            }
            if (expected === 'RETAILER') {
                return normalized === 'RETAILER';
            }
            if (expected === 'SUPER_DISTRIBUTOR' || expected === 'SUPERADMIN') {
                return normalized === 'SUPER_DISTRIBUTOR';
            }
            return normalized === expected;
        };

        const tryLocalApprovedLogin = () => {
            const local = this.getData();
            const user = (local.users || []).find((u) => {
                const sameId =
                    String(u.username || '') === String(username || '') ||
                    String(u.mobile || '') === String(username || '') ||
                    String(u.email || '') === String(username || '') ||
                    String(u.id || '') === String(username || '') ||
                    String(u._id || '') === String(username || '');
                const approved = String(u.status || '').toLowerCase() === 'approved';
                const passOk = String(u.password || '') === String(password || '');
                const roleOk = isRoleAllowedForPortal(u.role);
                return sameId && approved && passOk && roleOk;
            });
            if (!user) return null;
            const sessionUser = { ...user, role: normalizeRoleForClient(user.role) };
            localStorage.setItem('UjjwalPay_user', JSON.stringify(sessionUser));
            localStorage.setItem('UjjwalPay_token', localStorage.getItem('UjjwalPay_token') || ('LOCAL_LOGIN_' + Date.now()));
            return { success: true, user: sessionUser };
        };

        if (useLocalOnly) {
            const res = await mockApiService.login(username, password);
            if (res.success) {
                localStorage.setItem('UjjwalPay_user', JSON.stringify(res.user));
                localStorage.setItem('UjjwalPay_token', res.token);
                return { success: true, user: res.user };
            }
            return { success: false, message: res.message || "Invalid credentials. Please check your username and password." };
        }
        try {
            const res = await fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, location })
            });
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                const localLogin = tryLocalApprovedLogin();
                if (localLogin) return localLogin;
                return { success: false, message: "Backend server is not responding. Please start the backend server." };
            }
            if (data.success) {
                const normalizedUser = {
                    ...(data.user || {}),
                    role: normalizeRoleForClient(data.user?.role),
                    roles: Array.isArray(data.user?.roles)
                        ? data.user.roles.map((r) => normalizeRoleForClient(r))
                        : undefined
                };
                if (!isRoleAllowedForPortal(normalizedUser.role)) {
                    return {
                        success: false,
                        message: 'Invalid credentials.'
                    };
                }
                localStorage.setItem('UjjwalPay_user', JSON.stringify(normalizedUser));
                localStorage.setItem('UjjwalPay_token', data.token);
                return { success: true, user: normalizedUser };
            }
            const localLogin = tryLocalApprovedLogin();
            if (localLogin) return localLogin;
            return { success: false, message: data.error || data.message || "Login failed" };
        } catch (e) {
            const localLogin = tryLocalApprovedLogin();
            if (localLogin) return localLogin;
            return { success: false, message: "Server connection failed. Please ensure the backend is running." };
        }
    },

    getCurrentUser: function () {
        const saved = localStorage.getItem('UjjwalPay_user');
        return saved ? JSON.parse(saved) : null;
    },

    logoutUser: function () {
        localStorage.removeItem('UjjwalPay_user');
        localStorage.removeItem('UjjwalPay_token');
        window.location.href = '/';
    },

    refreshData: async function () {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return;
        if (useLocalOnly) {
            const user = this.getUserByUsername(currentUser.username);
            if (user) {
                localStorage.setItem('UjjwalPay_user', JSON.stringify(user));
                window.dispatchEvent(new Event('dataUpdated'));
                return user;
            }
            return currentUser;
        }
        try {
            const res = await fetch(`${BACKEND_URL}/refresh-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('UjjwalPay_user', JSON.stringify(data.user));
                window.dispatchEvent(new Event('dataUpdated'));
                return data.user;
            }
        } catch (e) {
            console.error("Failed to refresh data", e);
        }
    },

    updateUserProfile: async function (profileData) {
        if (useLocalOnly) {
            const currentUser = this.getCurrentUser();
            const data = this.getData();
            const idx = data.users.findIndex(u => u.username === currentUser.username);
            const updated = { ...currentUser, ...profileData };
            if (idx !== -1) data.users[idx] = updated;
            localStorage.setItem('UjjwalPay_user', JSON.stringify(updated));
            this.saveData(data);
            return true;
        }
        try {
            const currentUser = this.getCurrentUser();
            const res = await fetch(`${BACKEND_URL}/update-profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id, ...profileData })
            });
            const data = await res.json();
            if (data.success) {
                const updatedUser = { ...currentUser, ...data.user };
                localStorage.setItem('UjjwalPay_user', JSON.stringify(updatedUser));
                window.dispatchEvent(new Event('dataUpdated'));
                return true;
            }
            return false;
        } catch (e) {
            console.error("Update profile failed:", e);
            return false;
        }
    },

    adminUpdateUser: async function (userId, profileData) {
        if (useLocalOnly) {
            const data = this.getData();
            const idx = data.users.findIndex(u => u.id === userId || u.username === userId);
            if (idx !== -1) {
                data.users[idx] = { ...data.users[idx], ...profileData };
                this.saveData(data);
                return { success: true };
            }
            return { success: false, message: "User not found" };
        }
        try {
            const res = await fetch(`${BACKEND_URL}/update-profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, ...profileData })
            });
            return await res.json();
        } catch (e) { return { success: false, message: e.message }; }
    },

    fetchSales: async function (userId, date) {
        if (useLocalOnly) return { success: true, sales: [] };
        try {
            const res = await fetch(`${BACKEND_URL}/fetch-sales`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, date })
            });
            return await res.json();
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    getTopMerchants: async function (period, state) {
        if (useLocalOnly) return { success: true, merchants: [] };
        try {
            const res = await fetch(`${BACKEND_URL}/top-merchants`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ period, state })
            });
            return await res.json();
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    // --- WALLET & TRANSACTIONS ---
    getWalletBalance: async function (userId) {
        if (useLocalOnly) {
           const user = this.getCurrentUser();
           return user ? (user.balance || "0.00") : "0.00";
        }
        try {
            const token = localStorage.getItem('UjjwalPay_token');
            const res = await fetch(`${BACKEND_URL}/get-balance`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) {
                // Fallback: return cached user balance
                const user = this.getCurrentUser();
                return user ? (user.balance || "0.00") : "0.00";
            }
            const data = await res.json();
            return data.success ? String(data.balance) : "0.00";
        } catch (e) {
            // Fallback: return cached user balance on any error
            const user = this.getCurrentUser();
            return user ? (user.balance || "0.00") : "0.00";
        }
    },

    logTransaction: async function (userId, service, amount, operator, number, status) {
        if (useLocalOnly) {
            const user = this.getCurrentUser();
            const curBal = parseFloat(user.balance || 0);
            let newBal = curBal;
            if (service.includes('AEPS_WITHDRAWAL') || service.includes('AEPS_AADHAAR_PAY') || service === 'ADD_FUNDS') {
                newBal = (curBal + parseFloat(amount)).toFixed(2);
            } else {
                newBal = (curBal - parseFloat(amount)).toFixed(2);
            }
            const updatedUser = { ...user, balance: newBal };
            localStorage.setItem('UjjwalPay_user', JSON.stringify(updatedUser));
            
            const data = this.getData();
            data.transactions.push({
                id: Date.now(),
                userId, service, amount, operator, number, status,
                created_at: new Date().toISOString()
            });
            this.saveData(data);
            return true;
        }
        try {
            const res = await fetch(`${BACKEND_URL}/log-txn`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, service, amount, operator, number, status })
            });
            const data = await res.json();

            if (data.success && status === 'SUCCESS') {
                const user = this.getCurrentUser();
                const curBal = parseFloat(user.balance || 0);
                let newBal = curBal;
                if (service.includes('AEPS_WITHDRAWAL') || service.includes('AEPS_AADHAAR_PAY') || service === 'ADD_FUNDS') {
                    newBal = (curBal + parseFloat(amount)).toFixed(2);
                }
                else if (service.includes('AEPS_CASH_DEPOSIT') || service.includes('RECHARGE') || service.includes('BILL_PAY')) {
                    newBal = (curBal - parseFloat(amount)).toFixed(2);
                } else {
                    newBal = (curBal - parseFloat(amount)).toFixed(2);
                }
                localStorage.setItem('UjjwalPay_user', JSON.stringify({ ...user, balance: newBal }));
            }
            return data.success;
        } catch (e) { return false; }
    },

    getUserTransactions: async function (userId) {
        if (useLocalOnly) {
            return (this.getData().transactions || []).filter(t => t.userId === userId);
        }
        try {
            const res = await fetch(`${BACKEND_URL}/transactions?userId=${userId}`);
            const data = await res.json();
            return data.success ? data.transactions : [];
        } catch (e) { return []; }
    },

    // --- KYC ---
    uploadKyc: async function (kycData) {
        if (useLocalOnly) return { success: true, message: "KYC documents uploaded successfully." };
        try {
            const res = await fetch(`${BACKEND_URL}/upload-kyc`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(kycData)
            });
            return await res.json();
        } catch (e) { return { success: false, message: "KYC Upload Failed" }; }
    },

    getKycStatus: async function (userId) {
        if (useLocalOnly) return [];
        try {
            const res = await fetch(`${BACKEND_URL}/kyc-status?userId=${userId}`);
            const data = await res.json();
            return data.success ? data.documents : [];
        } catch (e) { return []; }
    },

    submitKyc: async function (username, type, kycData = {}) {
        if (useLocalOnly) {
            const data = this.getData();
            const userIdx = data.users.findIndex(u => u.username === username || u.mobile === username);
            if (userIdx !== -1) {
                if (type === 'MAIN') data.users[userIdx].profile_kyc_status = 'PENDING';

                this.saveData(data);
            }
            return { success: true, message: "KYC application submitted for review." };
        }
        try {
            const endpoint = '/submit-profile-kyc';
            const payload = { ...kycData };
            if (type === 'MAIN') {
                payload.fullName = kycData.fullName;
                payload.shopSelfie = kycData.shopPhoto || kycData.shopSelfie;
                payload.userId = username;
            } else {
                payload.userId = username;
            }

            const res = await fetch(`${BACKEND_URL}${endpoint}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('UjjwalPay_token')}`
                },
                body: JSON.stringify(payload)
            });
            const resData = await res.json();
            
            if (resData.success) {
                const data = this.getData();
                const userIdx = data.users.findIndex(u => u.username === username || u.mobile === username);
                if (userIdx !== -1) {
                    if (type === 'MAIN') {
                        data.users[userIdx].profile_kyc_status = 'PENDING';
                    }
                    this.saveData(data);
                }
                return { success: true, ...resData };
            }
            return resData;
        } catch (e) {
            console.error("KYC Submission error:", e);
            return { success: false, message: e.message };
        }
    },

    submitAepsKyc: async function (userId, kycData) {
        if (useLocalOnly) {
            const data = this.getData();
            const userIdx = data.users.findIndex(u => u.id === userId || u.username === userId);
            if (userIdx !== -1) {
                data.users[userIdx].aeps_kyc_status = 'PENDING';
                data.users[userIdx].aeps_kyc_details = kycData;
                this.saveData(data);
            }
            return { status: true, message: "AEPS KYC submitted successfully." };
        }
        try {
            // Frontend -> Main Backend logic with JAR details
            const panImageBase64 = kycData.panImage ? kycData.panImage.split(',')[1] : null;
            const shopImageBase64 = kycData.shopImage ? kycData.shopImage.split(',')[1] : null;
            const businessProofBase64 = kycData.businessProof ? kycData.businessProof.split(',')[1] : null;
            const chequeImageBase64 = kycData.chequeImage ? kycData.chequeImage.split(',')[1] : null;
            const physicalVerificationBase64 = kycData.physicalVerification ? kycData.physicalVerification.split(',')[1] : null;
            const videoKycBase64 = kycData.videoKyc ? kycData.videoKyc.split(',')[1] : null;

            const payload = {
                userId: userId,
                jarConfig: {
                    username: "UjjwalPayd",
                    password: "796c3ee556ac31f3754a38cfd15b8044",
                    ipAddress: "223.235.103.251",
                    superMerchantId: 1407,
                    fingpayUrl: `http://13.232.173.241:9090/aeps/onboard?userId=${userId}`
                },
                latitude: parseFloat(kycData.latitude || 28.6139),
                longitude: parseFloat(kycData.longitude || 77.2090),
                VedioKycWithLatLongData: videoKycBase64, // Root level alternative
                merchant: {
                    merchantLoginPin: kycData.merchantLoginPin,
                    firstName: kycData.firstName,
                    middleName: kycData.middleName || "",
                    lastName: kycData.lastName,
                    merchantPhoneNumber: kycData.merchantPhoneNumber,
                    merchantAddress: {
                        merchantAddress1: kycData.merchantAddress1,
                        merchantAddress2: kycData.merchantAddress2 || "",
                        merchantState: parseInt(kycData.merchantState),
                        merchantCityName: kycData.merchantCityName,
                        merchantDistrictName: kycData.merchantDistrictName,
                        merchantPinCode: kycData.merchantPinCode
                    },
                    companyLegalName: kycData.companyLegalName,
                    companyType: parseInt(kycData.companyType),
                    emailId: kycData.emailId,
                    kyc: {
                        userPan: kycData.userPan,
                        aadhaarNumber: kycData.aadhaarNumber,
                        gstinNumber: kycData.gstinNumber || "",
                        companyOrShopPan: kycData.companyOrShopPan,
                        // Secondary location for images
                        panImage: panImageBase64,
                        shopImage: shopImageBase64,
                        tradeBusinessProof: businessProofBase64,
                        cancelledChequeImages: chequeImageBase64,
                        physicalVerification: physicalVerificationBase64,
                        VedioKycWithLatLongData: videoKycBase64
                    },
                    settlementV1: {
                        companyBankAccountNumber: kycData.companyBankAccountNumber,
                        bankIfscCode: kycData.bankIfscCode,
                        companyBankName: (kycData.companyBankName || "").toUpperCase(),
                        bankName: (kycData.companyBankName || "").toUpperCase(),
                        bankAccountName: kycData.bankAccountName
                    },
                    merchantKycAddressData: {
                        shopAddress: kycData.shopAddress,
                        shopCity: kycData.shopCity,
                        shopDistrict: kycData.shopDistrict,
                        shopState: parseInt(kycData.shopState),
                        shopPincode: kycData.shopPincode,
                        shopLatitude: parseFloat(kycData.latitude || 28.6139),
                        shopLongitude: parseFloat(kycData.longitude || 77.2090)
                    },
                    // Original location for images
                    panImage: panImageBase64,
                    shopImage: shopImageBase64,
                    tradeBusinessProof: businessProofBase64,
                    cancelledChequeImages: chequeImageBase64,
                    physicalVerification: physicalVerificationBase64,
                    VedioKycWithLatLongData: videoKycBase64,
                    
                    termsConditionCheck: true,
                    merchantStatus: true
                }
            };

            const res = await fetch(`${BACKEND_URL}/submit-aeps-kyc`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('UjjwalPay_token')}`
                },
                body: JSON.stringify(payload)
            });
            
            if (!res.ok) {
                 return { success: false, message: `Server error: ${res.status}` };
            }
            return await res.json();
        } catch (e) {
            return { success: false, message: "Backend connection failed. Ensure port 8080 is running." };
        }
    },

    async getPendingKycs(type) {
        if (useLocalOnly) {
            const data = this.getData();
            const users = (data.users || []).filter(u => {
                if (type === 'MAIN') return u.profile_kyc_status === 'PENDING';
                if (type === 'AEPS') return u.aeps_kyc_status === 'PENDING';
                return false;
            });
            return {
                success: true,
                kycs: users.map(u => ({
                    loginId: u.username,
                    fullName: u.name || u.fullName || u.firstName + ' ' + u.lastName,
                    userMobile: u.mobile,
                    userEmail: u.email,
                    created_at: u.createdAt || new Date().toISOString(),
                    merchant_id: u.merchantId,
                    ...(u.aeps_kyc_details || {})
                }))
            };
        }
        try {
            const endpoint = `/admin/pending-kyc?type=${type}`;
            const res = await fetch(`${BACKEND_URL}${endpoint}`, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('UjjwalPay_token')}` 
                }
            });
            return await res.json();
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    approveKyc: async function (username, type, merchantId = null) {
        if (useLocalOnly) {
            const data = this.getData();
            const userIdx = data.users.findIndex(u => u.username === username || u.mobile === username);
            if (userIdx !== -1) {
                if (type === 'MAIN') data.users[userIdx].profile_kyc_status = 'DONE';
                this.saveData(data);
            }
            return { success: true };
        }
        try {
            const res = await fetch(`${BACKEND_URL}/admin/approve-kyc`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('UjjwalPay_token')}`
                },
                body: JSON.stringify({ username, type, merchantId })
            });
            const resData = await res.json();
            if (resData.success) {
                const data = this.getData();
                const userIdx = data.users.findIndex(u => u.username === username || u.mobile === username);
                if (userIdx !== -1) {
                    if (type === 'MAIN') {
                        data.users[userIdx].profile_kyc_status = 'DONE';
                    }
                    if (type === 'AEPS') {
                        data.users[userIdx].aeps_kyc_status = 'DONE';
                    }
                    this.saveData(data);
                }
                return { success: true };
            }
            return resData;
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    rejectKyc: async function (username, type, reason = '') {
        if (useLocalOnly) {
            const data = this.getData();
            const userIdx = data.users.findIndex(u => u.username === username || u.mobile === username);
            if (userIdx !== -1) {
                if (type === 'MAIN') data.users[userIdx].profile_kyc_status = 'REJECTED';
                this.saveData(data);
            }
            return { success: true };
        }
        try {
            const res = await fetch(`${BACKEND_URL}/admin/reject-kyc`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('UjjwalPay_token')}`
                },
                body: JSON.stringify({ username, type, reason })
            });
            const resData = await res.json();
            if (resData.success) {
                const data = this.getData();
                const userIdx = data.users.findIndex(u => u.username === username || u.mobile === username);
                if (userIdx !== -1) {
                    if (type === 'MAIN') {
                        data.users[userIdx].profile_kyc_status = 'REJECTED';
                    }
                    if (type === 'AEPS') {
                        data.users[userIdx].aeps_kyc_status = 'REJECTED';
                    }
                    this.saveData(data);
                }
                return { success: true };
            }
            return resData;
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    sendAadhaarOTP: async function (username) {
        // Simulation: In production this would hit an UIDAI AUA/KSA provider
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const user = this.getUserByUsername(username);

        // Use existing email service to simulated phone OTP for dev
        if (user && user.email) {
            await sendOTPEmail(user.email, otp, user.name || "Retailer");
            return { success: true, otp: otp }; // Returning actual OTP for mock testing
        }
        return { success: false, message: "User contact not found" };
    },

    verifyPAN: async function (pan) {
        if (useLocalOnly) return { success: true, name: "DEMO USER", status: "VALID" };
        try {
            const response = await fetch(`${BACKEND_URL}/verify-pan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pan })
            });
            return await response.json();
        } catch (error) {
            console.error("PAN Verification Error:", error);
            return { success: false, message: "Server connection failed" };
        }
    },

    verifyAadhaarName: async function (aadhaar) {
        if (useLocalOnly) return { success: true, name: "DEMO USER" };
        try {
            const response = await fetch(`${BACKEND_URL}/verify-aadhaar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aadhaar })
            });
            return await response.json();
        } catch (error) {
            console.error("Aadhaar Verification Error:", error);
            return { success: false, message: "Server connection failed" };
        }
    },

    verifyAadhaar: async function (aadhaar) {
        return this.verifyAadhaarName(aadhaar);
    },

    verifyAadhaarBiometric: async function (aadhaar, pidData, mobile) {
        if (useLocalOnly) return { success: true, message: "Fingerprint matched successfully." };
        try {
            const response = await fetch(`${BACKEND_URL}/verify-aadhaar-biometric`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aadhaar, pidData, mobile })
            });
            return await response.json();
        } catch (error) {
            console.error("Biometric Verification Error:", error);
            return { success: false, message: "Server connection failed" };
        }
    },

    createDigiLockerSession: async function (aadhaar) {
        if (useLocalOnly) return { success: true, session_id: "RUP-SESS-9921" };
        try {
            const response = await fetch(`${BACKEND_URL}/verify-aadhaar-digilocker`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aadhaar })
            });
            return await response.json();
        } catch (error) {
            console.error("DigiLocker Session Error:", error);
            return { success: false, message: "Server connection failed" };
        }
    },

    verifyAadhaarBiometricOtp: async function (aadhaar, otp) {
        if (useLocalOnly) return { success: true, message: "OTP verified updated successfully." };
        try {
            const response = await fetch(`${BACKEND_URL}/verify-aadhaar-biometric-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aadhaar, otp })
            });
            return await response.json();
        } catch (error) {
            console.error("Biometric OTP Error:", error);
            return { success: false, message: "Server connection failed" };
        }
    },


    // --- SUPPORT ---
    raiseTicket: async function (ticketData) {
        try {
            const res = await fetch(`${BACKEND_URL}/raise-ticket`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ticketData)
            });
            return await res.json();
        } catch (e) { return { success: false, message: "Failed to raise ticket" }; }
    },

    getMyTickets: async function (userId) {
        try {
            const res = await fetch(`${BACKEND_URL}/my-tickets?userId=${userId}`);
            const data = await res.json();
            return data.success ? data.tickets : [];
        } catch (e) { return []; }
    },

    // --- PORTAL CONFIG ---
    getPortalConfig: async function () {
        try {
            const res = await fetch(`${BACKEND_URL}/portal-config`);
            const data = await res.json();
            return data.success ? data.config : null;
        } catch (e) { return null; }
    },

    getCommissions: async function () {
        try {
            const res = await fetch(`${BACKEND_URL}/commissions`);
            const data = await res.json();
            return data.success ? data.commissions : [];
        } catch (e) { return []; }
    },

    // --- HELPERS ---
    verifyLocation: function () {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('Geolocation not supported');
            } else {
                navigator.geolocation.getCurrentPosition(
                    (p) => resolve({ lat: p.coords.latitude.toFixed(6), long: p.coords.longitude.toFixed(6) }),
                    (e) => reject('Location access denied')
                );
            }
        });
    },

    generateOTP: function () {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },

    sendEmployeeVerificationOTP: async function (email, name) {
        const otp = this.generateOTP();
        const res = await sendOTPEmail(email, otp, name);
        if (res.success) {
            return { success: true, otp };
        }
        return res;
    },

    sendEmployeeLoginOTP: async function (email, name) {
        const otp = this.generateOTP();
        const res = await sendOTPEmail(email, otp, name);
        if (res.success) {
            return { success: true, otp };
        }
        return res;
    },

    sendEmployeeCredentials: async function (email, name, loginId, password, addedBy, role) {
        return await sendCredentialsEmail({
            to: email,
            name: name,
            loginId: loginId,
            password: password,
            addedBy: addedBy,
            portalType: role
        });
    },

    // --- ADMIN OVERSIGHT ---
    getAllUsers: async function () {
        try {
            const token = localStorage.getItem('UjjwalPay_token');
            const res = await fetch(`${BACKEND_URL}/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await safeJson(res, null);
            if (res.ok && data?.success && Array.isArray(data.users)) {
                const merged = new Map();
                for (const u of data.users) {
                    const key = u?._id || u?.id || u?.username || u?.mobile;
                    if (key) merged.set(String(key), u);
                }
                for (const u of this.getData().users || []) {
                    const key = u?._id || u?.id || u?.username || u?.mobile;
                    if (!key) continue;
                    if (!merged.has(String(key))) merged.set(String(key), u);
                }
                return Array.from(merged.values());
            }
        } catch (e) { }

        // Backend may not implement /admin/users in lightweight setups.
        // Fallback to role-wise pending approvals from live APIs so Admin approvals still work.
        try {
            const [retailRes, distRes, superDistRes] = await Promise.all([
                this.getPendingApprovalsByRole('retailer'),
                this.getPendingApprovalsByRole('distributor'),
                this.getPendingApprovalsByRole('super_distributor')
            ]);

            const pendingOnly = [
                ...(retailRes?.users || []),
                ...(distRes?.users || []),
                ...(superDistRes?.users || [])
            ];

            const uniqueByKey = new Map();
            // Start from pending API rows, then let local users override stale pending snapshots.
            for (const user of pendingOnly) {
                const key = user?._id || user?.id || user?.username || user?.mobile;
                if (!key) continue;
                uniqueByKey.set(String(key), user);
            }
            const localUsers = (this.getData().users || []);
            for (const user of localUsers) {
                const key = user?._id || user?.id || user?.username || user?.mobile;
                if (!key) continue;
                uniqueByKey.set(String(key), user);
            }
            if (uniqueByKey.size > 0) return Array.from(uniqueByKey.values());
        } catch (e) { }

        return this.getData().users || [];
    },


    getAllTransactions: async function () {
        if (useLocalOnly) return this.getData().transactions || [];
        try {
            const res = await fetch(`${BACKEND_URL}/all-transactions`);
            const data = await res.json();
            return data.success ? data.transactions : [];
        } catch (e) { return []; }
    },

    getTrashUsers: async function () {
        if (useLocalOnly) return [];
        try {
            const res = await fetch(`${BACKEND_URL}/trash-users`);
            const data = await res.json();
            return data.success ? data.users : [];
        } catch (e) { return []; }
    },

    getLoans: async function () {
        if (useLocalOnly) {
            return this.getData().loans || [];
        }
        try {
            const token = localStorage.getItem('UjjwalPay_token');
            const res = await fetch(`${BACKEND_URL}/loan/all`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            return Array.isArray(data) ? data : (data.success ? data.loans : []);
        } catch (e) { 
            console.error("Fetch Loans failed, using local", e);
            return this.getData().loans || []; 
        }
    },

    updateLoanStatus: async function (trackingId, status) {
        if (useLocalOnly) {
            const data = this.getData();
            const idx = data.loans.findIndex(l => l.tracking_id === trackingId);
            if (idx !== -1) {
                data.loans[idx].status = status;
                if (status === 'approved') {
                    data.loans[idx].offer_amount = 250000;
                    data.loans[idx].lender_name = 'HDFC BANK';
                }
                this.saveData(data);
                return { success: true, message: `Status updated to ${status} successfully.` };
            }
            return { success: false, message: 'Application not found in local db' };
        }
        try {
            const token = localStorage.getItem('UjjwalPay_token');
            const res = await fetch(`${BACKEND_URL}/loan/simulate-status`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ tracking_id: trackingId, status: status })
            });
            return await res.json();
        } catch (e) { return { success: false, message: 'Network error ' + e.message }; }
    },

    simulateLoanStatus: async function (trackingId, status) {
        return this.updateLoanStatus(trackingId, status);
    },

    registerLoanLead: async function (leadData) {
        if (useLocalOnly) {
            const data = this.getData();
            const trackingId = 'TRK_' + Math.floor(1000 + Math.random() * 9000);
            const newLead = {
                app_id: 'L' + Math.floor(100 + Math.random() * 900),
                name: leadData.name,
                phone: leadData.phone,
                tracking_id: trackingId,
                status: 'initiated',
                loan_type: leadData.loanType === 'PL' ? 'Personal Loan' : (leadData.loanType === 'GL' ? 'Gold Loan' : 'Loan Lead'),
                requested_amount: leadData.amount,
                dob: leadData.dob,
                pincode: leadData.pincode,
                pan: leadData.pan,
                income: leadData.income,
                employment_type: leadData.employment_type,
                updated_at: new Date().toISOString()
            };
            data.loans.push(newLead);
            this.saveData(data);
            return {
                success: true,
                message: "Loan lead registered successfully.",
                tracking_id: trackingId,
                redirectionUrl: "/loan-simulation",
                is_demo: true,
                phone: leadData.phone,
                name: leadData.name,
                amount: leadData.amount
            };
        }
        try {
            const res = await fetch(`${BACKEND_URL}/loan/register-lead`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leadData)
            });
            return await res.json();
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    checkLoanStatus: async function (phone) {
        if (useLocalOnly) {
            const data = this.getData();
            const loan = data.loans.find(l => l.phone === phone);
            if (loan) {
                return {
                    success: true,
                    name: loan.name,
                    phone: loan.phone,
                    status: (loan.status || 'unknown').toUpperCase(),
                    reference_id: loan.tracking_id,
                    offer_amount: loan.offer_amount,
                    lender_name: loan.lender_name,
                    interest_rate: loan.interest_rate || '10.5%',
                    updated_at_date: new Date(loan.updated_at).toLocaleDateString(),
                    updated_at_time: new Date(loan.updated_at).toLocaleTimeString()
                };
            }
            return { success: false, message: "Application not found locally" };
        }
        try {
            const res = await fetch(`${BACKEND_URL}/loan/check-status?phone=${phone}`);
            return await res.json();
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    getLoanStats: async function () {
        if (useLocalOnly) {
            const data = this.getData();
            const loans = data.loans || [];
            return {
                success: true,
                total: loans.length,
                approved: loans.filter(l => l.status === 'approved').length,
                pending: loans.filter(l => l.status === 'initiated' || l.status === 'pending').length,
                rejected: loans.filter(l => l.status === 'rejected').length
            };
        }
        try {
            const res = await fetch(`${BACKEND_URL}/loan/stats`);
            return await res.json();
        } catch (e) {
            return { success: false };
        }
    },

    simulateLoanWebhook: async function (trackingId, status) {
        if (useLocalOnly) {
            return this.updateLoanStatus(trackingId, status);
        }
        try {
            const res = await fetch(`${BACKEND_URL}/loan/simulate-webhook`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tracking_id: trackingId, status: status })
            });
            return await res.json();
        } catch (e) {
            return { success: false };
        }
    },



    restoreUser: async function (username) {
        if (useLocalOnly) return { success: true };
        try {
            const res = await fetch(`${BACKEND_URL}/restore-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });
            return await res.json();
        } catch (e) { return { success: false }; }
    },

    resendCredentials: async function (user) {
        if (useLocalOnly) return { success: true, message: "Credentials rest successfully." };
        try {
            const res = await fetch(`${BACKEND_URL}/send-credentials`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: user.email,
                    name: user.name,
                    login_id: user.username || user.mobile,
                    password: user.password,
                    pin: user.pin || '1122', 
                    added_by: 'Administrator',
                    portal_type: user.role
                })
            });
            return await res.json();
        } catch (e) { return { success: false }; }
    },

    getData: function () {
        const d = localStorage.getItem('UjjwalPay_data');
        let data = d ? JSON.parse(d) : null;

        if (!data) {
            // Initial mock data if none exists
            data = {
                users: [
                   { id: 1, name: 'System Admin', username: 'admin', mobile: '8920150242', role: 'ADMIN', status: 'Approved', balance: '125000', email: 'admin@UjjwalPay.in', password: 'Admin@123' },
                   { id: 2, name: 'Distributor Primary', username: '8210350444', mobile: '8210350444', role: 'DISTRIBUTOR', status: 'Approved', balance: '75000', email: 'distributor@UjjwalPay.in', password: 'Dist@123', partyCode: 'DIST001' },
                   { id: 3, name: 'Super Distributor', username: 'sdistributor', mobile: '8877665544', role: 'SUPER_DISTRIBUTOR', status: 'Approved', balance: '100000', email: 'sdist@example.com', password: 'pass', partyCode: 'SDIST001' }
                ],
                loans: [],
                transactions: [],
                news: "Welcome to UjjwalPay Fintech Admin Panel!",
                chartTitle: "Weekly Volume Activity",
                chartData: [
                    { name: 'Mon', value: 400 }, { name: 'Tue', value: 300 },
                    { name: 'Wed', value: 600 }, { name: 'Thu', value: 800 },
                    { name: 'Fri', value: 500 }, { name: 'Sat', value: 900 },
                    { name: 'Sun', value: 700 }
                ],
                quickActions: [
                    { title: "Wallet Topup", subTitle: "Add funds to wallet", icon: "Wallet" },
                    { title: "Manage Store", subTitle: "Edit store profile", icon: "Building2" }
                ],
                stats: {
                    todayActive: "12",
                    weeklyActive: "45",
                    monthlyActive: "189",
                    debitSale: "₹ 1,24,500",
                    labels: {
                        today: { title: "TODAY ACTIVE" },
                        weekly: { title: "WEEKLY ACTIVE" },
                        monthly: { title: "MONTHLY ACTIVE" },
                        debit: { title: "TOTAL DEBIT" }
                    }
                },
                wallet: { balance: "1,24,500.00", retailerName: "Super Admin" },
                promotions: {
                    banners: [
                        { id: 1, image: mainLogo, title: "Modern Banking Suite", subtitle: "Secure | Fast | Reliable" },
                        { id: 2, image: mainLogo, title: "Financial Inclusion", subtitle: "Digital India | Last Mile Reach" }
                    ]
                },
                services: [
                    {
                        category: 'Banking & Finance',
                        items: [
                            { label: 'AEPS Withdrawal', icon: 'zap', active: true },
                            { label: 'Money Transfer', icon: 'send', active: true }
                        ]
                    }
                ]
            };
            this.saveData(data); // Force save initial
        } else if (!data.users.find(u => u.username === '8210350444')) {
            // Proactively add the new distributor if it's missing from existing mock store
            data.users.push({ id: 2, name: 'Distributor Primary', username: '8210350444', mobile: '8210350444', role: 'DISTRIBUTOR', status: 'Approved', balance: '75000', email: 'distributor@UjjwalPay.in', password: 'Dist@123', partyCode: 'DIST001' });
            this.saveData(data);
        }

        // Ensure sub-properties exist to prevent crashes
        if (!data.stats) data.stats = { todayActive: "0", weeklyActive: "0", monthlyActive: "0", debitSale: "₹ 0", labels: { today: { title: "TODAY ACTIVE" }, weekly: { title: "WEEKLY ACTIVE" }, monthly: { title: "MONTHLY ACTIVE" }, debit: { title: "TOTAL DEBIT" } } };
        if (!data.users) data.users = [];
        if (!data.loans) data.loans = [];
        if (!data.wallet) data.wallet = { balance: "0.00", retailerName: "Retailer" };

        const user = localStorage.getItem('UjjwalPay_user');
        if (user) data.currentUser = JSON.parse(user);
        return data;
    },

    saveData: function (data) {
        if (data && data.currentUser) {
            localStorage.setItem('UjjwalPay_user', JSON.stringify(data.currentUser));
        }
        localStorage.setItem('UjjwalPay_data', JSON.stringify(data));
        window.dispatchEvent(new Event('dataUpdated'));
    },

    getUserByUsername: function (username) {
        const data = this.getData();
        return data.users.find(u => u.username === username || u.mobile === username);
    },

    getPendingApprovalsByRole: async function (role) {
        const normalizedRole = normalizeRoleForBackend(role);
        if (useLocalOnly) {
            const data = this.getData();
            const users = (data.users || []).filter(
                (u) => String(u.status || '').toLowerCase() === 'pending' && normalizeRoleForBackend(u.role) === normalizedRole
            );
            return { success: true, users };
        }
        try {
            const res = await fetch(`${BACKEND_URL}/approvals?role=${encodeURIComponent(normalizedRole)}`);
            const payload = await safeJson(res, { success: false, users: [] });
            if (Array.isArray(payload)) {
                return { success: true, users: payload };
            }
            return { success: !!payload.success, users: payload.users || payload.data || [] };
        } catch (e) {
            return { success: false, users: [], message: e.message };
        }
    },

    approveUser: async function (identifier, password, partyCode, parentId = null, pin = '1122', state = '', role = '') {
        const existingCodes = (this.getData().users || []).map(u => u.partyCode);
        const normalizedPartyCode = (partyCode || generateUniquePartyCode(state, role, existingCodes)).toString().toUpperCase();
        if (useLocalOnly) {
            const data = this.getData();
            const userIdx = data.users.findIndex(
                u =>
                    u.username === identifier ||
                    u.mobile === identifier ||
                    u.id === identifier ||
                    u._id === identifier
            );
            if (userIdx !== -1) {
                data.users[userIdx].status = 'Approved';
                data.users[userIdx].password = password;
                data.users[userIdx].partyCode = normalizedPartyCode;
                data.users[userIdx].pin = pin;
                if (parentId) data.users[userIdx].ownerId = parentId;
                this.saveData(data);
            }
            return { success: true };
        }
        try {
            const token = localStorage.getItem('UjjwalPay_token');
            const payload = {
                id: identifier,
                username: identifier,
                password,
                pin,
                partyCode: normalizedPartyCode,
                status: 'Approved',
                parent_id: parentId
            };

            // Prefer generic endpoint (role agnostic), fallback to legacy admin endpoint.
            let res = await fetch(`${BACKEND_URL}/approve-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                res = await fetch(`${BACKEND_URL}/admin/approve-user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify(payload)
                });
            }
            const data = await safeJson(res, {});
            const normalizedSuccess =
                typeof data?.success === 'boolean'
                    ? data.success
                    : res.ok && !data?.error;

            return {
                ...data,
                success: normalizedSuccess
            };
        } catch (e) { 
            console.error("DB Update failed", e); 
            return { success: false, message: e.message };
        }
    },

    updateUserRole: async function (username, newRole) {
        if (useLocalOnly) {
           const data = this.getData();
           const idx = data.users.findIndex(u => u.username === username);
           if (idx !== -1) {
               data.users[idx].role = newRole;
               this.saveData(data);
           }
           return { success: true };
        }
        try {
            const res = await fetch(`${BACKEND_URL}/update-user-role`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, newRole })
            });
            const resData = await res.json();
            if (resData.success) {
                const data = this.getData();
                const userIdx = data.users.findIndex(u => u.username === username);
                if (userIdx !== -1) {
                    data.users[userIdx].role = newRole;
                    this.saveData(data);
                }
                return { success: true };
            }
            return resData;
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    rejectUser: async function (identifier) {
        if (useLocalOnly) {
            const data = this.getData();
            const idx = data.users.findIndex(
                u =>
                    u.username === identifier ||
                    u.mobile === identifier ||
                    u.id === identifier ||
                    u._id === identifier
            );
            if (idx !== -1) {
                data.users[idx].status = 'Rejected';
                this.saveData(data);
            }
            return idx !== -1 ? { success: true, message: 'User rejected successfully.' } : { success: false, message: 'User not found.' };
        }
        try {
            const token = localStorage.getItem('UjjwalPay_token');
            let res = await fetch(`${BACKEND_URL}/approve-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ id: identifier, username: identifier, status: 'Rejected' })
            });
            let data = await safeJson(res, null);
            if (!res.ok || !data?.success) {
                res = await fetch(`${BACKEND_URL}/admin/approve-user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify({ id: identifier, username: identifier, status: 'Rejected' })
                });
                data = await safeJson(res, null);
            }
            return data || { success: false, message: `Reject failed (${res.status})` };
        } catch (e) { return { success: false, message: e.message }; }
    },

    resetData: function () {
        localStorage.removeItem('UjjwalPay_data');
        window.dispatchEvent(new Event('dataUpdated'));
    },

    updateUserCertificates: async function (userId, data) {
        try {
            const res = await fetch(`${BACKEND_URL}/admin/update-user-certificates`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, ...data })
            });
            return await res.json();
        } catch (e) { return { success: false, message: e.message }; }
    },

    updateUserGeofencing: async function (userId, data) {
        try {
            const res = await fetch(`${BACKEND_URL}/admin/update-user-geofencing`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, ...data })
            });
            return await res.json();
        } catch (e) { return { success: false, message: e.message }; }
    },

    verifyDocument: async function (username, docName, status) {
        try {
            const res = await fetch(`${BACKEND_URL}/admin/verify-document`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, docName, status })
            });
            return await res.json();
        } catch (e) { return { success: false, message: e.message }; }
    },

    /** Remove a member from UjjwalPay_data.users and legacy distributor/super-admin stores (keeps UI in sync after API delete). */
    removeUserFromLocalStores: function (identifier) {
        if (identifier == null || String(identifier).trim() === '') return false;
        const match = (u) => userMatchesIdentifier(u, identifier);
        let changed = false;

        const data = this.getData();
        const prevUsers = data.users || [];
        const nextUsers = prevUsers.filter((u) => !match(u));
        if (nextUsers.length !== prevUsers.length) {
            changed = true;
            this.saveData({ ...data, users: nextUsers });
        }

        const dists = sharedDataService.getAllDistributors();
        const nextDists = dists.filter((u) => !match(u));
        if (nextDists.length !== dists.length) {
            changed = true;
            sharedDataService.saveDistributors(nextDists, true);
        }

        const sas = sharedDataService.getAllSuperAdmins();
        const nextSas = sas.filter((u) => !match(u));
        if (nextSas.length !== sas.length) {
            changed = true;
            sharedDataService.saveSuperAdmins(nextSas, true);
        }

        return changed;
    },

    deleteUser: async function (identifier) {
        if (useLocalOnly) {
            this.removeUserFromLocalStores(identifier);
            return { success: true };
        }
        const enc = encodeURIComponent(String(identifier));
        try {
            const token = localStorage.getItem('UjjwalPay_token');
            const headers = {
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            };
            let res = await fetch(`${BACKEND_URL}/delete-user/${enc}`, {
                method: 'DELETE',
                headers
            });
            let payload = await safeJson(res, {});
            if (!res.ok || payload.success === false) {
                res = await fetch(`${BACKEND_URL}/admin/delete-user/${enc}`, {
                    method: 'DELETE',
                    headers
                });
                payload = await safeJson(res, {});
            }
            if (res.ok && payload.success !== false) {
                this.removeUserFromLocalStores(identifier);
                return {
                    success: true,
                    message: payload.message || 'User deleted successfully'
                };
            }
            return {
                success: false,
                message: payload.message || `Delete failed (${res.status})`
            };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }
};

export default dataService;
