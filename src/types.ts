export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Appetizers' | 'Mains' | 'Desserts' | 'Drinks';
  tags?: string[];
  status: 'available' | 'out_of_stock';
}

export interface CartItem extends MenuItem {
  quantity: number;
  customization?: string;
}

export interface Order {
  id: string;
  tableNo?: string;
  arrival?: string;
  specialInstructions?: string;
  items: CartItem[];
  status: 'new' | 'in_progress' | 'ready' | 'completed';
  timestamp: Date;
  type: 'dine_in' | 'take_out';
}

export const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: '地中海鮮蔬沙拉',
    description: '時令精選，主廚之味。豐富的鮮蔬搭配特製醬汁。',
    price: 380,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZWOIGjGLOeXJYhk8fR_p_Wbh-Kma1FQI6RIV2vuVflHHB2QAFC5F1MeZ3XzGW1ssbCX_KcYrFcLo-ZRTw-DAAraFCFBs-BO7prMzXwrP8EMy-XwyG0k45dzjcoNUuKPD70TQD9uam0O-ZPyv3LNZx4fcnu7F_i4XnD0b1Q2uQsK_rWtKRpqGrSu_4iC66JfAEUOfinHkIt_ruUDhLGJvFJVF1PLHQY7jPvCvZNlgcWyefNSNesSyVSDJZfLsmcGs2VwvpBV-lwJY',
    category: 'Appetizers',
    tags: ['今日推薦'],
    status: 'available'
  },
  {
    id: '2',
    name: '酪梨藜麥田園沙拉',
    description: '橄欖油油醋醬 / 微辣',
    price: 320,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwAXuKgHP2fTBetxOt_a5vW-uD4wSZtFcbIlY0KKMk1kMtF4ajIiLYWLHxivlMI36rDs69ktWNeinJghSMQlxw7A9nQVLeU7aykNG_7S0uz9TONfIdvlqyQD7lakWfjigv3h2UijkxaHXM7LfX6awn47ElfYsI8jxLNfRDwXkzqxqkndTHYSdXLJzK2GTHMrSrdRjR-dVxqm42YvcyFEmfc_XiuUGCqJ7PshNo61BEA91076YyWaaEOCOtYHLAdCkj_vIsmGA5ZXg',
    category: 'Appetizers',
    status: 'available'
  },
  {
    id: '3',
    name: '炭烤熟成肋眼牛排',
    description: '五分熟 / 搭配季節烤蔬菜',
    price: 1280,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWoNs1L2yzZcYbYwF3AjigxdyLo23MS9cmY86YEiffRXnOlAwfqWxxe1a2iTwWSwKNlippDTS7jEw3T2KlMgjTyN1-PYxEnsv6wdXoV5lXwNuqJm2r0MOozoi1RqtFEFfb1OAqd4VwZI9oe4QEdLAI1fMY5p5XgckSJ97xoThtu0oYdVDBrsmo9pzgzl85x8_UZRDq0lnZQrvimj_jOuZ7AyA63yxkEZjeDEIarzFPRqgj_CwOs4IPS1bx-hJ47vsFUbgwVqj7KEE',
    category: 'Mains',
    status: 'available'
  },
  {
    id: '4',
    name: '煙燻鮭魚沙拉',
    description: '主廚推薦，鮮美煙燻鮭魚。',
    price: 380,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoFuw7jcR0D2YOyqndymtploBVcqZca2SY4tFRRV1WTIsnGmVL8kSevGKDS_rIK7hAbr4jblUPa0WLXh_KY1yi00CGltNYZU3TSBbLFQSBio1q4LHK3b-fbb_buP-V6IkkLtnUS62HpCXV6qQdRGR0pifmFbQfLQ35ejSzqay7sr8r_F6CNU7wMl90PfkwB2A4c8YhoDTp9INTDUixJe-hxOmuFSp7U7NslmjhoJz7Rb_B7SPHaDONviSg5NTsJO11hK3Odi4emjA',
    category: 'Appetizers',
    tags: ['主廚推薦'],
    status: 'available'
  },
  {
    id: '5',
    name: '森林莓果鬆餅',
    description: '甜點，酸甜莓果。',
    price: 260,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9TE0_fG_gM9EXnumjQgbbqpnJlpIUbPSwBJoX7cBdyExGhV3RRzKg8_gnDN4d0MmcdvLy_Ta-fNDDkQ7fRX8r2xovvqp29g-WBnz0YBKzdjJB71WdhUbznRnfGvee69Ndhhk0aKeUR2nu14qK72JCT4wlUCw9W6zTw8vP7aHEcIxh1R1lhaeDWBw-L6At0LAPTgT-1MQD-topBByLRX-WcpTDrsiCMa9ISM_tt5esKjya4Cq5ppj4NVEuXmGIHWLuTUpwun8Y0kU',
    category: 'Desserts',
    tags: ['甜點'],
    status: 'out_of_stock'
  },
  {
    id: '6',
    name: '經典巧克力甜甜圈',
    description: '下午茶，濃郁巧克力。',
    price: 95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmFObCy9fwu6uXoLAId81ATZlg-xAifceUhCw6Y0TcGVt1BCMYffdicCuAY9gz_CrbV7S9MZPYno1I6uSwLfoi3juHyfBmQkNGo6dk69XK4BFnRJsLSV1Dh13Gj9_Uhu0YWi0vbbwsLm3k6ICTqgOkGgE-6wnAWms7WxSRNbj8OlES_YocW8yKfPyNj9APZjqv_XYleqrPTn6xF81UubEC1_txPLDry6tguda795JZVa-noTatTHQhng02ePEz3vEgFm8SzeEt_W4',
    category: 'Desserts',
    tags: ['下午茶'],
    status: 'available'
  },
  {
    id: '7',
    name: '低溫慢烤豬肋排',
    description: '精選主食，肉質鮮嫩。',
    price: 620,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl09zox1YkeFLrYjU_9CL8j4PnxaGChsahsKCt7pWe21zj7x7ccNJEiW6S0v_64fIbY_05FrrJOU_Q6xIRdmtWfW5xOpJKiVvNPRn06IuhQoA1Ba-OkAazrnL1bqVj8BISVCsDouH0_3H4NJ8aH2dvsxy2N7FA4coLInvCUc0lm75RElg5WGMXY6BRSvK_wc-KILXMZA-4MseW3pAQxqQiyoSQsad5IxyDDBT_ZICxTKNhDF90kbPRnWeQ6UwO6Q30BlaOCByh8L8',
    category: 'Mains',
    status: 'available'
  },
  {
    id: '8',
    name: '香煎鮭魚佐蘆筍',
    description: '精選主食，營養均衡。',
    price: 580,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe-BzEpmHpF-g2dgae7FgwAK3LFe8wC4MeR1mBB0TR91AZqHKtPNxGek7lMib3LtITPKiYKE2BM4YhauXG49VeLI_5zMdbar3Cq0jxHfMJTgKx1taEDPzsbbDSZi4xKuNEOoLRiJELduGV9HfUUMwaoSqTVCCLiHliUfG5G3s99J-WAEzpcTRdsa_k35znNby1GDbbNS2UVkFnicmVZN3oybICNClq_QPW-36hl3Iebx3rUITlJSXYlC_k7ZyB8eVtOX6xyUZIU8U',
    category: 'Mains',
    status: 'available'
  },
  {
    id: '9',
    name: '松露野菇義大利麵',
    description: '採用義大利進口黑松露醬，搭配當季綜合野菇，香氣濃郁。',
    price: 450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfKunF52A65bM3WAUjcbySxLESlwgiVVML4OjaJIFYJSsQCQHkRtogIpYgZkhXgBSBV2ztax6R7mBtbjotNTfdiuNPlkjepta02sekMKatqj2UsiyzNbPw-wo658IAa8nsyLStxzunrX72exS6GXCgP4-rclO4g8bak3nNkod_1a5F7Ep0-5uJeTFsQQDTLoWXL-JjZfYXBCvpqjJpHp9pNXNHCQ6p0G9GKiUaNujq6_0mchbDeaHTp8PqeUE8PlPYwmMjmVMzAXg',
    category: 'Mains',
    status: 'available'
  },
  {
    id: '10',
    name: '義式番茄脆餅',
    description: '開胃菜，清爽開胃。',
    price: 180,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDR2Cjbx13tvYEqJYsniYs3QahHmaAkBQFBmzQCFVNQOEkil5_b9vPwUf_rTRcWbOoWOzaz-cfFc-aThJKWXbLU0dQG66IZjLREezlTD4AOfST-SllH5TftXY0iO76pYlpXWSGkHVx4hOL_h_tprnk8K6KbAL2GdDtBuIcuP3tORw-iw0UOY6bABKzijfkHVmD0WVfZIoVE_OlVKJDS-ixC-ZRlyptETwdrVtJEe_EmReZHQmYakH4P7pkDB1JD69I7QBlVi6iqQo',
    category: 'Appetizers',
    status: 'available'
  },
  {
    id: '11',
    name: '酥炸花枝圈',
    description: '開胃菜，酥脆可口。',
    price: 220,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbod_u04YpFLJlEWu7CK0zRMops4IWtrpxrLG3w5Rf_jw-t-8kqjqDDF7fqf3qlXh_4LDHff27_qqB6Zt6d2BAWz1iW7jp-zN72VF6J2VHB51G3ha1ENxuqcOl38Ra8S-d5A4P3uNvj3nfL6o06JvEXtVTL3nRtHyDsiOLDn6i218-41n6vnZBdVIIqGPgIFpoAlqCn3G6Xa6nlC2eQHjMeCrSF-bZXFRi5paz3ipQRmuMaYENLlBFs9y2SCghvN3JVtOuc3sW5gQ',
    category: 'Appetizers',
    status: 'available'
  }
];
