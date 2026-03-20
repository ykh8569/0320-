/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MenuItem, 
  CartItem, 
  Order, 
  INITIAL_MENU 
} from './types';

// --- Components ---

const Header = ({ title, onBack, isAdmin, profilePic }: { title: string, onBack?: () => void, isAdmin?: boolean, profilePic?: string }) => (
  <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 bg-surface/90 backdrop-blur-md z-50 border-b border-surface-container">
    <div className="flex items-center gap-4">
      {onBack ? (
        <button onClick={onBack} className="material-symbols-outlined text-primary active:scale-95 duration-200 cursor-pointer">arrow_back</button>
      ) : (
        <button className="material-symbols-outlined text-primary active:scale-95 duration-200 cursor-pointer">menu</button>
      )}
      <h1 className="font-headline font-bold text-xl tracking-tight text-primary italic">{title}</h1>
    </div>
    {profilePic && (
      <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
    )}
    {!profilePic && (
      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
        <span className="material-symbols-outlined text-sm">more_vert</span>
      </div>
    )}
  </header>
);

const BottomNav = ({ activeTab, onTabChange, tabs }: { activeTab: string, onTabChange: (tab: string) => void, tabs: { id: string, label: string, icon: string }[] }) => (
  <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 backdrop-blur-md rounded-t-xl shadow-[0_-12px_32px_rgba(45,47,49,0.06)]">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`flex flex-col items-center justify-center rounded-2xl px-6 py-2 transition-all duration-300 ${activeTab === tab.id ? 'bg-primary-container/20 text-primary' : 'text-on-surface opacity-60 hover:opacity-100'}`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${activeTab === tab.id ? 1 : 0}` }}>{tab.icon}</span>
        <span className="font-body font-medium text-[10px] uppercase tracking-widest mt-1">{tab.label}</span>
      </button>
    ))}
  </nav>
);

// --- Screens ---

const CustomerMenu = ({ menu, onAddToCart, onGoToCart, cartCount, cartTotal }: { menu: MenuItem[], onAddToCart: (item: MenuItem) => void, onGoToCart: () => void, cartCount: number, cartTotal: number }) => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const categories = ['全部', '開胃菜', '精選主餐', '甜點', '飲品'];
  
  const filteredMenu = useMemo(() => {
    if (activeCategory === '全部') return menu;
    const catMap: Record<string, string> = { '開胃菜': 'Appetizers', '精選主餐': 'Mains', '甜點': 'Desserts', '飲品': 'Drinks' };
    return menu.filter(item => item.category === catMap[activeCategory]);
  }, [menu, activeCategory]);

  const featuredItem = menu.find(item => item.tags?.includes('今日推薦'));

  return (
    <div className="pt-20 pb-40 px-4 max-w-md mx-auto">
      <section className="mb-12">
        <span className="font-headline font-bold text-primary tracking-widest text-xs uppercase">今日推薦</span>
        <h2 className="font-headline font-extrabold text-4xl leading-tight text-on-surface">時令精選<br/>主廚之味</h2>
        {featuredItem && (
          <div className="mt-6 relative h-64 w-full bg-surface-container-lowest rounded-xl shadow-md overflow-hidden">
            <img src={featuredItem.image} alt={featuredItem.name} className="w-full h-full object-cover scale-110 -rotate-2" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-xl">
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-headline font-bold text-lg">{featuredItem.name}</p>
                  <p className="text-sm text-on-surface-variant font-medium">${featuredItem.price}</p>
                </div>
                <button 
                  onClick={() => onAddToCart(featuredItem)}
                  className="editorial-gradient text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 duration-150"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <nav className="flex gap-4 overflow-x-auto pb-8 no-scrollbar -mx-4 px-4 sticky top-16 bg-surface/95 backdrop-blur-sm z-40">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-headline font-bold text-sm transition-colors ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'}`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="space-y-12">
        {['精選主餐', '開胃菜'].map(catName => {
          const catItems = filteredMenu.filter(item => {
             const catMap: Record<string, string> = { '開胃菜': 'Appetizers', '精選主餐': 'Mains' };
             return item.category === catMap[catName];
          });
          if (catItems.length === 0) return null;
          
          return (
            <div key={catName} className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-outline-variant/10 pb-2">
                <h3 className="font-headline font-extrabold text-2xl tracking-tight">{catName}</h3>
                <span className="text-xs font-body uppercase tracking-tighter text-on-surface-variant">{catName === '精選主餐' ? 'Signature Mains' : 'Appetizers'}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                {catItems.map((item, idx) => (
                  <div key={item.id} className={`group ${idx === 2 && catName === '精選主餐' ? 'col-span-2' : ''}`}>
                    {idx === 2 && catName === '精選主餐' ? (
                      <div className="relative h-48 rounded-xl bg-surface-container-lowest overflow-hidden flex shadow-sm">
                        <div className="w-1/2 p-4 flex flex-col justify-between">
                          <div>
                            <h4 className="font-headline font-extrabold text-xl text-on-surface leading-snug">{item.name}</h4>
                            <p className="text-xs text-on-surface-variant mt-2 font-body line-clamp-2">{item.description}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-headline font-bold text-primary">${item.price}</p>
                            <button 
                              onClick={() => onAddToCart(item)}
                              className="editorial-gradient text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm active:scale-95 duration-150"
                            >
                              加入購物車
                            </button>
                          </div>
                        </div>
                        <div className="w-1/2 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative aspect-[3/4] rounded-xl bg-surface-container overflow-hidden mb-3">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                          <button 
                            onClick={() => onAddToCart(item)}
                            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-primary flex items-center justify-center shadow-sm active:scale-90 duration-150"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                        <h4 className="font-headline font-bold text-on-surface leading-tight">{item.name}</h4>
                        <p className="font-headline font-bold text-primary mt-1">${item.price}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-24 left-0 w-full px-6 z-40">
          <button 
            onClick={onGoToCart}
            className="w-full editorial-gradient text-white py-4 rounded-2xl shadow-xl flex items-center justify-between px-6 active:scale-95 duration-150"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
              <span className="font-headline font-bold tracking-tight">查看購物車 ({cartCount})</span>
            </div>
            <span className="font-headline font-bold text-lg">${cartTotal}</span>
          </button>
        </div>
      )}
    </div>
  );
};

const CartScreen = ({ cart, onUpdateQuantity, onCheckout }: { cart: CartItem[], onUpdateQuantity: (id: string, delta: number) => void, onCheckout: (info: any) => void }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const [tableNo, setTableNo] = useState('');
  const [arrival, setArrival] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  return (
    <div className="pt-20 pb-40 px-6 max-w-md mx-auto">
      <div className="mb-8">
        <p className="text-primary font-bold tracking-widest text-[10px] uppercase mb-1">Current Order</p>
        <h2 className="text-3xl font-extrabold tracking-tight leading-none">確認您的美味選單</h2>
      </div>

      <div className="space-y-4 mb-12">
        {cart.map(item => (
          <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <div>
                <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                <p className="text-on-surface-variant text-xs mt-1">{item.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-headline font-bold text-primary text-lg">${item.price}</span>
                <div className="flex items-center gap-3 bg-surface-container rounded-full px-2 py-1">
                  <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-primary active:scale-90 duration-150">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="text-sm font-bold">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-primary active:scale-90 duration-150">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold tracking-tight">配送與桌位資訊</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">桌號 Table No.</label>
            <div className="bg-surface-container-low rounded-xl px-4 py-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">restaurant</span>
              <input 
                value={tableNo}
                onChange={(e) => setTableNo(e.target.value)}
                className="bg-transparent border-none p-0 focus:ring-0 text-sm w-full font-medium" 
                placeholder="例如: B12" 
                type="text"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">抵達時間 Arrival</label>
            <div className="bg-surface-container-low rounded-xl px-4 py-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">schedule</span>
              <input 
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                className="bg-transparent border-none p-0 focus:ring-0 text-sm w-full font-medium" 
                placeholder="18:30" 
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">特殊要求 Special Instructions</label>
          <div className="bg-surface-container-low rounded-xl px-4 py-3">
            <textarea 
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 text-sm w-full font-medium resize-none" 
              placeholder="是否有任何過敏原或飲食需求？" 
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md rounded-t-3xl shadow-2xl z-50">
        <div className="max-w-md mx-auto p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant">小計 Subtotal</span>
              <span className="font-headline font-semibold">${subtotal}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant">服務費 (10%)</span>
              <span className="font-headline font-semibold">${serviceFee}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold">總計 Total</span>
              <span className="font-headline text-2xl font-black text-primary">${total}</span>
            </div>
          </div>
          <button 
            onClick={() => onCheckout({ tableNo, arrival, specialInstructions })}
            className="w-full editorial-gradient text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            確認下單
            <span className="material-symbols-outlined text-white">shopping_bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuEditor = ({ menu, onToggleStatus }: { menu: MenuItem[], onToggleStatus: (id: string) => void }) => {
  return (
    <div className="pt-20 px-4 pb-32">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <p className="text-sm font-medium text-on-surface-variant opacity-70 mb-1">Kitchen Management</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface font-headline">菜單管理</h2>
        </div>
        <button className="bg-primary text-white flex items-center justify-center p-3 rounded-xl shadow-lg active:scale-95 transition-transform">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
        <button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-sm">全部項目</button>
        <button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-low text-on-surface-variant font-medium text-sm">主廚推薦</button>
        <button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-low text-on-surface-variant font-medium text-sm">精選主食</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {menu.map(item => (
          <div key={item.id} className="bg-white rounded-3xl p-4 flex gap-4 items-center shadow-sm relative overflow-hidden group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between h-24">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg leading-tight font-headline">{item.name}</h3>
                  <p className="text-primary font-headline font-bold mt-1">${item.price}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                {item.tags?.[0] && (
                  <span className={`text-xs font-medium px-2 py-1 rounded ${item.tags[0] === '主廚推薦' ? 'bg-tertiary-container/20 text-tertiary-dim' : 'bg-surface-container text-on-surface-variant'}`}>
                    {item.tags[0]}
                  </span>
                )}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={item.status === 'available'} 
                    onChange={() => onToggleStatus(item.id)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-2 text-xs font-medium text-on-surface-variant">{item.status === 'available' ? '供應中' : '缺貨'}</span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="bg-surface-container-high text-on-surface px-8 py-3 rounded-2xl font-semibold text-sm hover:bg-surface-variant transition-colors active:scale-95 duration-200">
          載入更多菜單項目
        </button>
      </div>

      <div className="fixed right-6 bottom-24 z-40">
        <button className="w-14 h-14 editorial-gradient text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

const LiveOrders = ({ orders, onUpdateStatus }: { orders: Order[], onUpdateStatus: (id: string, status: Order['status']) => void }) => {
  const sections = [
    { id: 'new', label: '新訂單', color: 'bg-error' },
    { id: 'in_progress', label: '製作中', color: 'bg-tertiary-container' },
    { id: 'ready', label: '待取餐', color: 'bg-primary-container' },
    { id: 'completed', label: '已完成', color: 'bg-outline-variant' }
  ];

  return (
    <div className="pt-20 px-4 pb-32 space-y-8">
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-on-surface-variant font-body text-xs uppercase tracking-widest mb-1">Kitchen Management</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Live Orders</h2>
          </div>
          <div className="text-right">
            <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
              {orders.filter(o => o.status !== 'completed').length} Active
            </span>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap shadow-sm">全部訂單</button>
          <button className="bg-surface-container-low text-on-surface-variant px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap">內用 (8)</button>
          <button className="bg-surface-container-low text-on-surface-variant px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap">外帶 (4)</button>
        </div>
      </section>

      <div className="space-y-10">
        {sections.map(section => {
          const sectionOrders = orders.filter(o => o.status === section.id);
          return (
            <section key={section.id} className="space-y-4">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${section.color} ${section.id === 'new' ? 'animate-pulse' : ''}`}></div>
                  <h3 className="font-headline font-bold text-lg">{section.label} ({sectionOrders.length})</h3>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">keyboard_arrow_down</span>
              </div>
              <div className="space-y-3">
                {sectionOrders.map(order => (
                  <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm relative overflow-hidden">
                    <div className={`absolute left-0 top-0 w-1 h-full ${section.color}`}></div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="font-headline font-bold text-primary">#ORD-{order.id}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-surface-container-high px-2 py-0.5 rounded text-[10px] font-bold">
                            {order.type === 'dine_in' ? `桌號 ${order.tableNo}` : '外帶'}
                          </span>
                          <span className="text-on-surface-variant text-xs">剛才</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-headline font-bold text-lg">
                          ${order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-surface-container py-3">
                      <ul className="text-sm space-y-1 text-on-surface-variant">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{item.name} × {item.quantity}</span>
                            {item.customization && <span className="text-[10px] font-bold text-on-tertiary-container">{item.customization}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      {section.id === 'new' && (
                        <>
                          <button onClick={() => onUpdateStatus(order.id, 'completed')} className="bg-surface-container-high text-on-surface font-bold py-2.5 rounded-xl text-sm active:scale-95">拒絕</button>
                          <button onClick={() => onUpdateStatus(order.id, 'in_progress')} className="editorial-gradient text-white font-bold py-2.5 rounded-xl text-sm shadow-md active:scale-95">接受訂單</button>
                        </>
                      )}
                      {section.id === 'in_progress' && (
                        <button onClick={() => onUpdateStatus(order.id, 'ready')} className="col-span-2 editorial-gradient text-white font-bold py-2.5 rounded-xl text-sm shadow-md active:scale-95 flex items-center justify-center gap-2">
                          完成製作 <span className="material-symbols-outlined text-sm">check_circle</span>
                        </button>
                      )}
                      {section.id === 'ready' && (
                        <button onClick={() => onUpdateStatus(order.id, 'completed')} className="col-span-2 bg-primary text-white font-bold py-2.5 rounded-xl text-sm shadow-md active:scale-95">
                          確認送達
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <button className="fixed bottom-24 right-6 w-14 h-14 editorial-gradient text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 duration-150 z-40">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'menu' | 'cart' | 'admin_menu' | 'admin_orders'>('menu');
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '2841',
      tableNo: 'B12',
      items: [
        { ...INITIAL_MENU[2], quantity: 1, customization: '五分熟' },
        { ...INITIAL_MENU[8], quantity: 2 }
      ],
      status: 'new',
      timestamp: new Date(),
      type: 'dine_in'
    },
    {
      id: '2842',
      items: [
        { ...INITIAL_MENU[0], quantity: 1 },
        { ...INITIAL_MENU[10], quantity: 1 }
      ],
      status: 'new',
      timestamp: new Date(),
      type: 'take_out'
    }
  ]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0);
    });
  };

  const handleCheckout = (info: any) => {
    const newOrder: Order = {
      id: Math.floor(Math.random() * 9000 + 1000).toString(),
      ...info,
      items: [...cart],
      status: 'new',
      timestamp: new Date(),
      type: info.tableNo ? 'dine_in' : 'take_out'
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setView('menu');
  };

  const handleToggleStatus = (id: string) => {
    setMenu(prev => prev.map(item => item.id === id ? { ...item, status: item.status === 'available' ? 'out_of_stock' : 'available' } : item));
  };

  const handleUpdateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const customerTabs = [
    { id: 'menu', label: 'Menu', icon: 'restaurant_menu' },
    { id: 'cart', label: 'Cart', icon: 'shopping_bag' }
  ];

  const adminTabs = [
    { id: 'admin_orders', label: 'Live Orders', icon: 'moped' },
    { id: 'admin_menu', label: 'Menu Editor', icon: 'edit_note' }
  ];

  const isAdminView = view.startsWith('admin');

  return (
    <div className="min-h-screen">
      <Header 
        title={isAdminView ? (view === 'admin_menu' ? 'Menu Editor' : 'The Culinary Editorial') : (view === 'cart' ? '您的購物車' : 'The Culinary Editorial')} 
        onBack={view === 'cart' ? () => setView('menu') : undefined}
        profilePic={isAdminView ? "https://lh3.googleusercontent.com/aida-public/AB6AXuC3_ZGOqqfeYQ5VmlV9_eRevayWcFmb0rZiQURwCplZ_TDV_UBxHK0wWWsz3xqJu24kwMOGBvGnu6kdM8TatMX15KOt5s2X6Fqw4Y0de-c2Ku9u6Ed5SlVLFd8Qn35waiF1Q7FE4rbKxB6QgJ7a-EPYn3WdLt7h2P4hHYazUlv2OqEQxpG3TyJk5K0p8njfCWKTsQcnp7Pi01WHGSlzgR4ex1Zwh3LvsxVIH7QbQ3wzuFi4DYA9HpcJx73YJvY452N94ftlwh0gKjo" : undefined}
      />

      <main>
        <AnimatePresence mode="wait">
          {view === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <CustomerMenu menu={menu} onAddToCart={handleAddToCart} onGoToCart={() => setView('cart')} cartCount={cartCount} cartTotal={cartTotal} />
            </motion.div>
          )}
          {view === 'cart' && (
            <motion.div key="cart" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <CartScreen cart={cart} onUpdateQuantity={handleUpdateQuantity} onCheckout={handleCheckout} />
            </motion.div>
          )}
          {view === 'admin_menu' && (
            <motion.div key="admin_menu" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <MenuEditor menu={menu} onToggleStatus={handleToggleStatus} />
            </motion.div>
          )}
          {view === 'admin_orders' && (
            <motion.div key="admin_orders" initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(10px)' }}>
              <LiveOrders orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* View Switcher for Demo Purposes */}
      <div className="fixed top-20 right-4 z-[60] flex flex-col gap-2">
         <button 
           onClick={() => setView(isAdminView ? 'menu' : 'admin_orders')}
           className="bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm"
         >
           Switch to {isAdminView ? 'Customer' : 'Admin'}
         </button>
      </div>

      <BottomNav 
        activeTab={view} 
        onTabChange={(tab) => setView(tab as any)} 
        tabs={isAdminView ? adminTabs : customerTabs} 
      />
    </div>
  );
}
