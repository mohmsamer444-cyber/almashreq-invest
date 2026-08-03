import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createServer as createViteServer } from 'vite';
import { 
  User, GlobalMarket, MarketAsset, InvestmentPackage, 
  DepositRequest, WithdrawRequest, PaymentMethodConfig, 
  AppNotification, TradePosition, PlatformConfig, LiveStats, ActivityLogItem,
  SecurityLog, FaqItem, PartnerItem, PromotionItem
} from './src/types';
import { 
  INITIAL_MARKETS, INITIAL_ASSETS, INITIAL_PACKAGES, 
  INITIAL_PAYMENT_METHODS, INITIAL_PLATFORM_CONFIG 
} from './src/data/initialData';

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'almashreq_luxury_jwt_secret_2026';
const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data dir exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-Memory Database Structure with disk persistence
interface StoreData {
  users: User[];
  passwords: Record<string, string>; // userId -> hashed password
  markets: GlobalMarket[];
  assets: MarketAsset[];
  packages: InvestmentPackage[];
  paymentMethods: PaymentMethodConfig[];
  depositRequests: DepositRequest[];
  withdrawRequests: WithdrawRequest[];
  notifications: AppNotification[];
  trades: TradePosition[];
  platformConfig: PlatformConfig;
  activityLogs: ActivityLogItem[];
  securityLogs: SecurityLog[];
  stats: LiveStats;
}

// Default Admin User
const defaultAdminId = 'admin-159847';
const defaultAdminUser: User = {
  id: defaultAdminId,
  name: 'المدير العام (sad_yau)',
  phone: 'sad_yau',
  role: 'admin',
  status: 'active',
  balance: 1000000,
  todayProfit: 50000,
  pendingProfit: 0,
  totalInvested: 500000,
  referralCode: 'ADMIN2026',
  createdAt: new Date().toISOString(),
};

// Demo Standard User
const demoUserId = 'u-demo-1';
const demoUser: User = {
  id: demoUserId,
  name: 'محمد علي الشريف',
  phone: '01000000000',
  role: 'user',
  status: 'active',
  balance: 25450,
  todayProfit: 1250,
  pendingProfit: 450,
  totalInvested: 20000,
  activePackageId: 'pkg-gold',
  activePackageName: 'باقة الذهب الذهبية',
  referralCode: 'MASHREQ77',
  createdAt: new Date().toISOString(),
};

const store: StoreData = {
  users: [defaultAdminUser, demoUser],
  passwords: {
    [defaultAdminId]: bcrypt.hashSync('1598470000Aa#', 10),
    [demoUserId]: bcrypt.hashSync('123456', 10),
  },
  markets: [...INITIAL_MARKETS],
  assets: [...INITIAL_ASSETS],
  packages: [...INITIAL_PACKAGES],
  paymentMethods: [...INITIAL_PAYMENT_METHODS],
  depositRequests: [
    {
      id: 'dep-101',
      userId: demoUserId,
      userName: demoUser.name,
      userPhone: demoUser.phone,
      amount: 10000,
      paymentMethod: 'vodafone',
      paymentMethodTitle: 'فودافون كاش',
      senderNumber: '01011122334',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      notes: 'طلب الاشتراك في باقة الذهب',
      packageName: 'باقة الذهب الذهبية'
    }
  ],
  withdrawRequests: [],
  notifications: [
    {
      id: 'notif-1',
      userId: demoUserId,
      title: 'مرحباً بك في منصة المشرق',
      message: 'تم تفعيل حسابك بنجاح. يمكنك الآن بدء التداول والاستثمار في الأسواق العالمية.',
      type: 'info',
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ],
  trades: [
    {
      id: 'trd-1',
      userId: demoUserId,
      userName: demoUser.name,
      assetId: 'a-gold',
      assetName: 'الذهب (سبيكة عيار 24)',
      symbol: 'XAU/USD',
      type: 'BUY',
      amount: 5000,
      entryPrice: 2810.00,
      currentPrice: 2845.50,
      pnl: 631.67,
      pnlPercentage: 12.63,
      status: 'OPEN',
      openedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  platformConfig: { ...INITIAL_PLATFORM_CONFIG },
  activityLogs: [
    { id: 'act-1', userName: 'محمد علي', action: 'قام بفتح صفقة شراء في سوق الذهب', time: 'منذ 5 دقائق', type: 'trade' },
    { id: 'act-2', userName: 'سارة أحمد', action: 'قدمت طلب إيداع عبر InstaPay', time: 'منذ 12 دقيقة', type: 'deposit' },
    { id: 'act-3', userName: 'خالد العتيبي', action: 'سجّل حساباً جديداً في المنصة', time: 'منذ 25 دقيقة', type: 'auth' }
  ],
  securityLogs: [
    { id: 'sec-1', userName: 'المدير العام (sad_yau)', userPhone: 'sad_yau', ip: '192.168.1.100', action: 'تسجيل دخول مسؤول بنجاح', status: 'success', time: 'منذ دقيقتين' },
    { id: 'sec-2', userName: 'محمد علي', userPhone: '01000000000', ip: '41.129.85.12', action: 'تسجيل دخول مستخدم', status: 'success', time: 'منذ 15 دقيقة' },
    { id: 'sec-3', userName: 'زائر مجهول', userPhone: '01099998888', ip: '197.35.40.11', action: 'محاولة دخول بكلمة مرور خاطئة', status: 'failed', time: 'منذ ساعة' }
  ],
  stats: {
    visitorsOnline: 342,
    registeredUsers: 14280,
    todayVisitors: 2890,
    todayRegistrations: 145,
    activeUsers: 8920,
    loggedInUsers: 184,
    totalTradingVolume: '148.5M $',
    successfulPayoutsRate: 99.8
  }
};

// Load saved store if present
function loadStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const data = fs.readFileSync(STORE_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (parsed.users) store.users = parsed.users;
      if (parsed.passwords) store.passwords = parsed.passwords;
      if (parsed.markets) store.markets = parsed.markets;
      if (parsed.assets) store.assets = parsed.assets;
      if (parsed.packages) store.packages = parsed.packages;
      if (parsed.paymentMethods) store.paymentMethods = parsed.paymentMethods;
      if (parsed.depositRequests) store.depositRequests = parsed.depositRequests;
      if (parsed.withdrawRequests) store.withdrawRequests = parsed.withdrawRequests;
      if (parsed.notifications) store.notifications = parsed.notifications;
      if (parsed.trades) store.trades = parsed.trades;
      if (parsed.platformConfig) store.platformConfig = parsed.platformConfig;
      if (parsed.activityLogs) store.activityLogs = parsed.activityLogs;
      if (parsed.securityLogs) store.securityLogs = parsed.securityLogs;
      if (parsed.stats) store.stats = parsed.stats;
    }
  } catch (err) {
    console.error('Error loading stored state:', err);
  }
}

function saveStore() {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving stored state:', err);
  }
}

loadStore();

// Live Simulation Price Engine
setInterval(() => {
  const vol = store.platformConfig.marketVolatility || 1.0;
  
  store.assets = store.assets.map(asset => {
    if (!asset.isEnabled) return asset;
    
    // Natural minor random percentage swing (-0.4% to +0.45%)
    const swingPercent = (Math.random() - 0.48) * 0.009 * vol;
    const oldPrice = asset.price;
    let newPrice = +(oldPrice * (1 + swingPercent)).toFixed(2);
    if (newPrice <= 0) newPrice = 0.01;

    const priceDiff = +(newPrice - oldPrice).toFixed(2);
    const newChange24h = +((asset.change24h || 0) + (swingPercent * 100)).toFixed(2);
    
    const newSparkline = [...(asset.sparkline || [oldPrice]).slice(-10), newPrice];
    const newHigh = Math.max(asset.high24h || newPrice, newPrice);
    const newLow = Math.min(asset.low24h || newPrice, newPrice);

    return {
      ...asset,
      prevPrice: oldPrice,
      price: newPrice,
      change24h: newChange24h,
      high24h: newHigh,
      low24h: newLow,
      sparkline: newSparkline
    };
  });

  // Update open trades PnL
  store.trades = store.trades.map(trade => {
    if (trade.status !== 'OPEN') return trade;
    const currentAsset = store.assets.find(a => a.id === trade.assetId);
    if (!currentAsset) return trade;

    const currPrice = currentAsset.price;
    let pnl = 0;
    if (trade.type === 'BUY') {
      pnl = ((currPrice - trade.entryPrice) / trade.entryPrice) * trade.amount;
    } else {
      pnl = ((trade.entryPrice - currPrice) / trade.entryPrice) * trade.amount;
    }

    const pnlPercentage = +((pnl / trade.amount) * 100).toFixed(2);
    return {
      ...trade,
      currentPrice: currPrice,
      pnl: +pnl.toFixed(2),
      pnlPercentage
    };
  });

  // Fluctuate live stats slightly for realistic animation
  store.stats.visitorsOnline = Math.max(150, store.stats.visitorsOnline + Math.floor((Math.random() - 0.49) * 5));
  store.stats.loggedInUsers = Math.max(50, store.stats.loggedInUsers + Math.floor((Math.random() - 0.49) * 3));

}, store.platformConfig.updateIntervalMs || 2500);

// Helper for logging activity
function addActivity(userName: string, action: string, type: ActivityLogItem['type']) {
  const newLog: ActivityLogItem = {
    id: 'act-' + Date.now(),
    userName,
    action,
    time: 'الآن',
    type
  };
  store.activityLogs = [newLog, ...store.activityLogs.slice(0, 49)];
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Middleware: Auth check
  const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'غير مصرح بالوصول' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) return res.status(403).json({ error: 'رمز الجلسة غير صالحة' });
      (req as any).user = decoded;
      next();
    });
  };

  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'صلاحيات المدير مطلوبة' });
    }
    next();
  };

  // ==========================================
  // PUBLIC & CLIENT API ROUTES
  // ==========================================

  // Get entire initial app state for client
  app.get('/api/state', (req, res) => {
    res.json({
      markets: store.markets,
      assets: store.assets,
      packages: store.packages,
      paymentMethods: store.paymentMethods.filter(pm => pm.isEnabled),
      platformConfig: store.platformConfig,
      stats: store.stats
    });
  });

  // AUTHENTICATION ROUTES
  app.post('/api/auth/register', (req, res) => {
    const { name, phone, password, confirmPassword } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'كلمات المرور غير متطابقة' });
    }

    const existingUser = store.users.find(u => u.phone === phone);
    if (existingUser) {
      return res.status(400).json({ error: 'رقم الهاتف مسجل بالفعل' });
    }

    const newUser: User = {
      id: 'u-' + Date.now(),
      name,
      phone,
      role: 'user',
      status: 'active',
      balance: 1000, // 1000 Welcome bonus simulation balance
      todayProfit: 0,
      pendingProfit: 0,
      totalInvested: 0,
      referralCode: 'MSH' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString()
    };

    store.users.push(newUser);
    store.passwords[newUser.id] = bcrypt.hashSync(password, 10);
    store.stats.registeredUsers++;
    store.stats.todayRegistrations++;

    addActivity(newUser.name, 'قام بتسجيل حساب جديد وحصل على مكافأة ترحيبية', 'auth');
    saveStore();

    const token = jwt.sign({ id: newUser.id, role: newUser.role, phone: newUser.phone }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: newUser
    });
  });

  app.post('/api/auth/login', (req, res) => {
    const { phone, password } = req.body;

    // Check for admin login username/phone
    if (phone === 'sad_yau' && password === '1598470000Aa#') {
      const admin = store.users.find(u => u.role === 'admin') || defaultAdminUser;
      const token = jwt.sign({ id: admin.id, role: 'admin', phone: admin.phone }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: admin });
    }

    const user = store.users.find(u => u.phone === phone);
    if (!user) {
      return res.status(400).json({ error: 'رقم الهاتف أو كلمة المرور غير صحيحة' });
    }

    if (user.status === 'blocked') {
      return res.status(403).json({ error: 'الحساب معطل حالياً، يُرجى التواصل مع الدعم الفني' });
    }

    const validPass = bcrypt.compareSync(password, store.passwords[user.id] || '');
    if (!validPass) {
      return res.status(400).json({ error: 'رقم الهاتف أو كلمة المرور غير صحيحة' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, phone: user.phone }, JWT_SECRET, { expiresIn: '7d' });

    addActivity(user.name, 'تسجيل دخول ناجح للمنصة', 'auth');

    res.json({ token, user });
  });

  app.get('/api/auth/me', authenticateToken, (req, res) => {
    const tokenUser = (req as any).user;
    const user = store.users.find(u => u.id === tokenUser.id);
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });

    const userTrades = store.trades.filter(t => t.userId === user.id);
    const userDeposits = store.depositRequests.filter(d => d.userId === user.id);
    const userWithdraws = store.withdrawRequests.filter(w => w.userId === user.id);
    const userNotifications = store.notifications.filter(n => n.userId === user.id || n.userId === 'all');

    res.json({
      user,
      trades: userTrades,
      deposits: userDeposits,
      withdraws: userWithdraws,
      notifications: userNotifications
    });
  });

  // DEPOSIT REQUEST (Submitting Deposit - "طلبك قيد المراجعة")
  app.post('/api/deposit/request', authenticateToken, (req, res) => {
    const authUser = (req as any).user;
    const user = store.users.find(u => u.id === authUser.id);
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });

    const { amount, paymentMethod, senderNumber, notes, packageName, receiptUrl } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'المبلغ المدخل غير صحيح' });
    }

    const pm = store.paymentMethods.find(p => p.code === paymentMethod);

    const newDeposit: DepositRequest = {
      id: 'dep-' + Date.now(),
      userId: user.id,
      userName: user.name,
      userPhone: user.phone,
      amount: Number(amount),
      paymentMethod,
      paymentMethodTitle: pm ? pm.title : paymentMethod,
      senderNumber: senderNumber || user.phone,
      receiptUrl: receiptUrl || undefined,
      notes: notes || undefined,
      packageName: packageName || undefined,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    store.depositRequests.unshift(newDeposit);

    // Send confirmation notification to user
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: user.id,
      title: 'طلب الإيداع قيد المراجعة ⏳',
      message: `تم استلام طلب إيداع بقيمة ${amount} ج.م عبر ${newDeposit.paymentMethodTitle}. طلبك الآن قيد المراجعة والتدقيق من قِبل الإدارة وسوف يتم إشعارك فور القبول.`,
      type: 'info',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    store.notifications.unshift(notif);

    addActivity(user.name, `قدم طلب إيداع بقيمة ${amount} ج.م (${newDeposit.paymentMethodTitle})`, 'deposit');
    saveStore();

    res.json({
      message: 'تم إرسال طلبك بنجاح. طلبك قيد المراجعة من قِبل الإدارة.',
      deposit: newDeposit
    });
  });

  // WITHDRAW REQUEST
  app.post('/api/withdraw/request', authenticateToken, (req, res) => {
    const authUser = (req as any).user;
    const user = store.users.find(u => u.id === authUser.id);
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });

    const { amount, paymentMethod, accountDetails } = req.body;
    const minLimit = store.platformConfig.minWithdrawalAmount || 300;

    if (!amount || amount < minLimit) {
      return res.status(400).json({ error: `الحد الأدنى للسحب هو ${minLimit} ج.م` });
    }

    if (user.balance < amount) {
      return res.status(400).json({ error: 'رصيدك الحالي غير كافٍ لإتمام عملية السحب' });
    }

    const pm = store.paymentMethods.find(p => p.code === paymentMethod);

    // Hold user balance during pending withdraw
    user.balance -= Number(amount);

    const newWithdraw: WithdrawRequest = {
      id: 'wth-' + Date.now(),
      userId: user.id,
      userName: user.name,
      userPhone: user.phone,
      amount: Number(amount),
      paymentMethod,
      paymentMethodTitle: pm ? pm.title : paymentMethod,
      accountDetails,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    store.withdrawRequests.unshift(newWithdraw);

    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: user.id,
      title: 'طلب السحب قيد المراجعة 💸',
      message: `تم تسجيل طلب سحب مبلغ ${amount} ج.م. طلبك قيد المعالجة للتحويل إلى حسابك.`,
      type: 'info',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    store.notifications.unshift(notif);

    addActivity(user.name, `قدم طلب سحب مبلغ ${amount} ج.م`, 'withdraw');
    saveStore();

    res.json({
      message: 'تم إرسال طلب السحب بنجاح وهو قيد المراجعة.',
      withdraw: newWithdraw,
      updatedBalance: user.balance
    });
  });

  // TRADING API (BUY / SELL / CLOSE)
  app.post('/api/trade/open', authenticateToken, (req, res) => {
    const authUser = (req as any).user;
    const user = store.users.find(u => u.id === authUser.id);
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });

    const { assetId, type, amount } = req.body; // type: BUY or SELL
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'المبلغ غير صحيح' });
    }

    if (user.balance < amount) {
      return res.status(400).json({ error: 'الرصيد المتاح غير كافٍ لفتح هذه الصفقة' });
    }

    const asset = store.assets.find(a => a.id === assetId);
    if (!asset || !asset.isEnabled) {
      return res.status(400).json({ error: 'الأصل غير متاح للتداول حالياً' });
    }

    user.balance -= Number(amount);
    user.totalInvested += Number(amount);

    const newTrade: TradePosition = {
      id: 'trd-' + Date.now(),
      userId: user.id,
      userName: user.name,
      assetId: asset.id,
      assetName: asset.name,
      symbol: asset.symbol,
      type: type === 'SELL' ? 'SELL' : 'BUY',
      amount: Number(amount),
      entryPrice: asset.price,
      currentPrice: asset.price,
      pnl: 0,
      pnlPercentage: 0,
      status: 'OPEN',
      openedAt: new Date().toISOString()
    };

    store.trades.unshift(newTrade);
    addActivity(user.name, `فتح صفقة ${type === 'BUY' ? 'شراء' : 'بيع'} على ${asset.name} بمبلغ ${amount} ج.م`, 'trade');
    saveStore();

    res.json({ message: 'تم فتح الصفقة بنجاح', trade: newTrade, balance: user.balance });
  });

  app.post('/api/trade/close', authenticateToken, (req, res) => {
    const authUser = (req as any).user;
    const { tradeId } = req.body;

    const trade = store.trades.find(t => t.id === tradeId && t.userId === authUser.id && t.status === 'OPEN');
    if (!trade) {
      return res.status(404).json({ error: 'الصفقة غير موجودة أو تم إغلاقها بالفعل' });
    }

    const user = store.users.find(u => u.id === authUser.id);
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });

    trade.status = 'CLOSED';
    trade.closedAt = new Date().toISOString();

    const returnAmount = trade.amount + trade.pnl;
    user.balance += Math.max(0, returnAmount);
    user.todayProfit += trade.pnl;

    addActivity(user.name, `أغلق صفقة ${trade.assetName} بربح/خسارة ${trade.pnl > 0 ? '+' : ''}${trade.pnl} ج.م`, 'trade');
    saveStore();

    res.json({ message: 'تم إغلاق الصفقة بنجاح', trade, balance: user.balance });
  });

  // MARK READ NOTIFICATIONS
  app.post('/api/notifications/read', authenticateToken, (req, res) => {
    const authUser = (req as any).user;
    store.notifications.forEach(n => {
      if (n.userId === authUser.id || n.userId === 'all') {
        n.isRead = true;
      }
    });
    saveStore();
    res.json({ success: true });
  });

  // ==========================================
  // ADMIN PANEL COMPLETE API ENDPOINTS
  // ==========================================

  // Get Admin Dashboard Overview
  app.get('/api/admin/overview', authenticateToken, requireAdmin, (req, res) => {
    res.json({
      stats: store.stats,
      users: store.users,
      depositRequests: store.depositRequests,
      withdrawRequests: store.withdrawRequests,
      packages: store.packages,
      markets: store.markets,
      assets: store.assets,
      paymentMethods: store.paymentMethods,
      platformConfig: store.platformConfig,
      activityLogs: store.activityLogs,
      securityLogs: store.securityLogs,
      notifications: store.notifications,
      trades: store.trades
    });
  });

  // USER MANAGEMENT
  app.post('/api/admin/users/status', authenticateToken, requireAdmin, (req, res) => {
    const { userId, status } = req.body;
    const user = store.users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });

    user.status = status;
    saveStore();
    res.json({ success: true, user });
  });

  app.post('/api/admin/users/balance', authenticateToken, requireAdmin, (req, res) => {
    const { userId, balance, todayProfit, pendingProfit } = req.body;
    const user = store.users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });

    if (balance !== undefined) user.balance = Number(balance);
    if (todayProfit !== undefined) user.todayProfit = Number(todayProfit);
    if (pendingProfit !== undefined) user.pendingProfit = Number(pendingProfit);

    saveStore();
    res.json({ success: true, user });
  });

  app.post('/api/admin/users/delete', authenticateToken, requireAdmin, (req, res) => {
    const { userId } = req.body;
    store.users = store.users.filter(u => u.id !== userId);
    saveStore();
    res.json({ success: true });
  });

  app.post('/api/admin/users/reset-password', authenticateToken, requireAdmin, (req, res) => {
    const { userId, newPassword } = req.body;
    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ error: 'كلمة المرور قصيرة جداً' });
    }
    store.passwords[userId] = bcrypt.hashSync(newPassword, 10);
    saveStore();
    res.json({ success: true, message: 'تم إعادة تعيين كلمة المرور بنجاح' });
  });

  // APPROVE DEPOSIT
  app.post('/api/admin/deposits/approve', authenticateToken, requireAdmin, (req, res) => {
    const { depositId } = req.body;
    const deposit = store.depositRequests.find(d => d.id === depositId);
    if (!deposit) return res.status(404).json({ error: 'طلب الإيداع غير موجود' });

    if (deposit.status !== 'pending') {
      return res.status(400).json({ error: 'تم اتخاذ إجراء بشأن هذا الطلب سابقاً' });
    }

    deposit.status = 'approved';

    // Add balance to target user
    const user = store.users.find(u => u.id === deposit.userId);
    if (user) {
      user.balance += deposit.amount;
      if (deposit.packageName) {
        user.activePackageName = deposit.packageName;
        const pkg = store.packages.find(p => p.name === deposit.packageName);
        if (pkg) user.activePackageId = pkg.id;
      }

      // Send approved notification
      const notif: AppNotification = {
        id: 'notif-' + Date.now(),
        userId: user.id,
        title: 'تم قبول طلب الإيداع 🎉',
        message: `تم الموافقة على طلب الإيداع بمبلغ ${deposit.amount} ج.م وتمت إضافة الرصيد لحسابك بنجاح.`,
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      };
      store.notifications.unshift(notif);
    }

    saveStore();
    res.json({ success: true, deposit });
  });

  // REJECT DEPOSIT
  app.post('/api/admin/deposits/reject', authenticateToken, requireAdmin, (req, res) => {
    const { depositId, adminNote } = req.body;
    const deposit = store.depositRequests.find(d => d.id === depositId);
    if (!deposit) return res.status(404).json({ error: 'طلب الإيداع غير موجود' });

    deposit.status = 'rejected';
    deposit.adminNote = adminNote || 'تعذر التحقق من إيصال التحويل، يرجى إعادة المحاولة أو التواصل مع الدعم.';

    const user = store.users.find(u => u.id === deposit.userId);
    if (user) {
      const notif: AppNotification = {
        id: 'notif-' + Date.now(),
        userId: user.id,
        title: 'تم رفض طلب الإيداع ❌',
        message: `نعتذر، تم رفض طلب الإيداع بمبلغ ${deposit.amount} ج.م. السبب: ${deposit.adminNote}`,
        type: 'alert',
        isRead: false,
        createdAt: new Date().toISOString()
      };
      store.notifications.unshift(notif);
    }

    saveStore();
    res.json({ success: true, deposit });
  });

  // APPROVE WITHDRAWAL
  app.post('/api/admin/withdrawals/approve', authenticateToken, requireAdmin, (req, res) => {
    const { withdrawId } = req.body;
    const withdraw = store.withdrawRequests.find(w => w.id === withdrawId);
    if (!withdraw) return res.status(404).json({ error: 'طلب السحب غير موجود' });

    withdraw.status = 'approved';

    const user = store.users.find(u => u.id === withdraw.userId);
    if (user) {
      const notif: AppNotification = {
        id: 'notif-' + Date.now(),
        userId: user.id,
        title: 'تم تنفيذ طلب السحب بنجاح 💸',
        message: `تمت الموافقة على طلب سحب مبلغ ${withdraw.amount} ج.م وتم التحويل لحسابك عبر ${withdraw.paymentMethodTitle}.`,
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      };
      store.notifications.unshift(notif);
    }

    saveStore();
    res.json({ success: true, withdraw });
  });

  // REJECT WITHDRAWAL
  app.post('/api/admin/withdrawals/reject', authenticateToken, requireAdmin, (req, res) => {
    const { withdrawId, adminNote } = req.body;
    const withdraw = store.withdrawRequests.find(w => w.id === withdrawId);
    if (!withdraw) return res.status(404).json({ error: 'طلب السحب غير موجود' });

    withdraw.status = 'rejected';
    withdraw.adminNote = adminNote || 'خطأ في بيانات الحساب المدخلة.';

    // Refund user balance
    const user = store.users.find(u => u.id === withdraw.userId);
    if (user) {
      user.balance += withdraw.amount;
      const notif: AppNotification = {
        id: 'notif-' + Date.now(),
        userId: user.id,
        title: 'تم إرجاع المبلغ لعدم إكمال السحب ⚠️',
        message: `تم رفض طلب السحب وإعادة مبلغ ${withdraw.amount} ج.م إلى رصيدك. السبب: ${withdraw.adminNote}`,
        type: 'warning',
        isRead: false,
        createdAt: new Date().toISOString()
      };
      store.notifications.unshift(notif);
    }

    saveStore();
    res.json({ success: true, withdraw });
  });

  // PACKAGE MANAGEMENT
  app.post('/api/admin/packages/save', authenticateToken, requireAdmin, (req, res) => {
    const pkg: InvestmentPackage = req.body;
    if (!pkg.id) {
      pkg.id = 'pkg-' + Date.now();
      store.packages.push(pkg);
    } else {
      const idx = store.packages.findIndex(p => p.id === pkg.id);
      if (idx !== -1) store.packages[idx] = pkg;
      else store.packages.push(pkg);
    }
    saveStore();
    res.json({ success: true, package: pkg, packages: store.packages });
  });

  app.post('/api/admin/packages/delete', authenticateToken, requireAdmin, (req, res) => {
    const { packageId } = req.body;
    store.packages = store.packages.filter(p => p.id !== packageId);
    saveStore();
    res.json({ success: true, packages: store.packages });
  });

  // GLOBAL MARKETS & ASSETS ADMIN
  app.post('/api/admin/markets/save', authenticateToken, requireAdmin, (req, res) => {
    const market: GlobalMarket = req.body;
    if (!market.id) {
      market.id = 'm-' + Date.now();
      store.markets.push(market);
    } else {
      const idx = store.markets.findIndex(m => m.id === market.id);
      if (idx !== -1) store.markets[idx] = market;
      else store.markets.push(market);
    }
    saveStore();
    res.json({ success: true, market, markets: store.markets });
  });

  app.post('/api/admin/markets/toggle', authenticateToken, requireAdmin, (req, res) => {
    const { marketId, status } = req.body;
    const market = store.markets.find(m => m.id === marketId);
    if (market) market.status = status;
    saveStore();
    res.json({ success: true, markets: store.markets });
  });

  app.post('/api/admin/assets/save', authenticateToken, requireAdmin, (req, res) => {
    const asset: MarketAsset = req.body;
    if (!asset.id) {
      asset.id = 'a-' + Date.now();
      asset.sparkline = [asset.price];
      store.assets.push(asset);
    } else {
      const idx = store.assets.findIndex(a => a.id === asset.id);
      if (idx !== -1) store.assets[idx] = { ...store.assets[idx], ...asset };
      else store.assets.push(asset);
    }
    saveStore();
    res.json({ success: true, asset, assets: store.assets });
  });

  app.post('/api/admin/assets/delete', authenticateToken, requireAdmin, (req, res) => {
    const { assetId } = req.body;
    store.assets = store.assets.filter(a => a.id !== assetId);
    saveStore();
    res.json({ success: true, assets: store.assets });
  });

  // PAYMENT METHODS ADMIN
  app.post('/api/admin/payment-methods/save', authenticateToken, requireAdmin, (req, res) => {
    const pm: PaymentMethodConfig = req.body;
    const idx = store.paymentMethods.findIndex(p => p.code === pm.code);
    if (idx !== -1) {
      store.paymentMethods[idx] = pm;
    } else {
      store.paymentMethods.push(pm);
    }
    saveStore();
    res.json({ success: true, paymentMethods: store.paymentMethods });
  });

  // SEND NOTIFICATION
  app.post('/api/admin/notifications/send', authenticateToken, requireAdmin, (req, res) => {
    const { userId, title, message, type } = req.body;

    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: userId || 'all',
      title: title || 'تنبيه إداري جديد',
      message,
      type: type || 'info',
      isRead: false,
      createdAt: new Date().toISOString()
    };

    store.notifications.unshift(notif);
    saveStore();
    res.json({ success: true, notification: notif });
  });

  // USER ROLE MANAGEMENT
  app.post('/api/admin/users/role', authenticateToken, requireAdmin, (req, res) => {
    const { userId, role } = req.body;
    const user = store.users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });

    user.role = role;
    saveStore();
    res.json({ success: true, user });
  });

  // ADMIN FORCE CLOSE TRADE
  app.post('/api/admin/trades/close-user-trade', authenticateToken, requireAdmin, (req, res) => {
    const { tradeId } = req.body;
    const trade = store.trades.find(t => t.id === tradeId && t.status === 'OPEN');
    if (!trade) return res.status(404).json({ error: 'الصفقة غير موجودة أو مغلقة بالفعل' });

    trade.status = 'CLOSED';
    trade.closedAt = new Date().toISOString();

    const user = store.users.find(u => u.id === trade.userId);
    if (user) {
      const returnAmount = trade.amount + trade.pnl;
      user.balance += Math.max(0, returnAmount);
      user.todayProfit += trade.pnl;
    }

    saveStore();
    res.json({ success: true, trade });
  });

  // TRIGGER DAILY PROFIT PAYOUT (FOR ALL ACTIVE PACKAGE HOLDERS)
  app.post('/api/admin/trigger-payout', authenticateToken, requireAdmin, (req, res) => {
    let affectedCount = 0;
    let totalProfitPaid = 0;

    store.users.forEach(u => {
      if (u.activePackageId && u.status === 'active') {
        const pkg = store.packages.find(p => p.id === u.activePackageId);
        if (pkg) {
          const dailyYield = +((u.balance * pkg.dailyProfitRate) / 100).toFixed(2);
          if (dailyYield > 0) {
            u.balance += dailyYield;
            u.todayProfit += dailyYield;
            affectedCount++;
            totalProfitPaid += dailyYield;

            // Notify user
            store.notifications.unshift({
              id: 'notif-' + Date.now() + Math.random(),
              userId: u.id,
              title: 'توزيع الأرباح اليومية 💰',
              message: `تم إيداع مبلغ ${dailyYield} ج.م أرباح يومية لحسابك من باقة (${pkg.name}).`,
              type: 'success',
              isRead: false,
              createdAt: new Date().toISOString()
            });
          }
        }
      }
    });

    saveStore();
    res.json({ success: true, affectedCount, totalProfitPaid });
  });

  // DELETE MARKET
  app.post('/api/admin/markets/delete', authenticateToken, requireAdmin, (req, res) => {
    const { marketId } = req.body;
    store.markets = store.markets.filter(m => m.id !== marketId);
    saveStore();
    res.json({ success: true, markets: store.markets });
  });

  // DELETE PAYMENT METHOD
  app.post('/api/admin/payment-methods/delete', authenticateToken, requireAdmin, (req, res) => {
    const { code } = req.body;
    store.paymentMethods = store.paymentMethods.filter(p => p.code !== code);
    saveStore();
    res.json({ success: true, paymentMethods: store.paymentMethods });
  });

  // PLATFORM CONFIG & MEDIA UPLOAD ADMIN
  app.post('/api/admin/config/save', authenticateToken, requireAdmin, (req, res) => {
    const newConfig: Partial<PlatformConfig> = req.body;
    store.platformConfig = { ...store.platformConfig, ...newConfig };
    saveStore();
    res.json({ success: true, platformConfig: store.platformConfig });
  });

  // VITE & STATIC FILES
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Al-Mashreq Platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
