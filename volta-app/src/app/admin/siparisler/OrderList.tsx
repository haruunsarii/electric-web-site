"use client";

import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";

type OrderItem = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  address: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
  items: OrderItem[];
};

export default function OrderList({ orders }: { orders: Order[] }) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        router.refresh(); // Refresh Server Components to get new status
      } else {
        alert("Durum güncellenemedi.");
      }
    } catch (error) {
      alert("Hata oluştu.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="p-xl text-center text-on-surface-variant font-body-md">
        Henüz hiç sipariş bulunmuyor.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-lowest border-b border-outline-variant font-label-technical text-on-surface-variant">
            <th className="p-md font-normal">Sipariş No</th>
            <th className="p-md font-normal">Müşteri</th>
            <th className="p-md font-normal hidden md:table-cell">Telefon</th>
            <th className="p-md font-normal">Tutar</th>
            <th className="p-md font-normal hidden sm:table-cell">Durum</th>
            <th className="p-md font-normal">Tarih</th>
            <th className="p-md font-normal text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Fragment key={order.id}>
              <tr 
                className={`border-b border-outline-variant transition-colors ${expandedOrderId === order.id ? 'bg-surface-container/50' : 'hover:bg-surface-container/50'}`}
              >
                <td className="p-md font-body-md text-primary font-bold whitespace-nowrap">{order.orderNumber}</td>
                <td className="p-md font-body-md text-on-surface">
                  {order.customerName}
                  <div className="text-[12px] text-on-surface-variant mt-1 md:hidden">{order.customerPhone}</div>
                </td>
                <td className="p-md font-body-md text-on-surface-variant hidden md:table-cell">{order.customerPhone}</td>
                <td className="p-md font-body-md text-on-surface font-bold whitespace-nowrap">{order.totalAmount.toFixed(2)} ₺</td>
                <td className="p-md hidden sm:table-cell">
                  <span className={`inline-block px-sm py-[2px] rounded-full text-[12px] font-bold ${
                    order.status === 'Bekliyor' || order.status === 'PENDING' ? 'bg-secondary-container text-on-secondary-container' : 
                    order.status === 'Kargolandı' ? 'bg-tertiary-container text-on-tertiary-container' :
                    order.status === 'Tamamlandı' ? 'bg-primary-container text-on-primary-container' :
                    'bg-error-container text-on-error-container'
                  }`}>
                    {order.status === 'PENDING' ? 'Bekliyor' : order.status}
                  </span>
                </td>
                <td className="p-md font-body-sm text-on-surface-variant whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                </td>
                <td className="p-md text-right">
                  <button 
                    onClick={() => toggleExpand(order.id)}
                    className="text-secondary hover:bg-secondary-container hover:text-on-secondary-container p-sm rounded transition-colors" 
                    title={expandedOrderId === order.id ? "Detayı Gizle" : "Detayı Gör"}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {expandedOrderId === order.id ? "expand_less" : "visibility"}
                    </span>
                  </button>
                </td>
              </tr>
              {expandedOrderId === order.id && (
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <td colSpan={7} className="p-0">
                    <div className="p-lg bg-surface-container/30 border-l-4 border-secondary animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                        {/* Sol Taraf: Müşteri ve Adres Bilgileri */}
                        <div>
                          <h4 className="font-headline-sm text-primary mb-sm flex items-center gap-xs">
                            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                            Teslimat Bilgileri
                          </h4>
                          <div className="bg-surface p-md rounded border border-outline-variant">
                            <p className="font-body-md text-on-surface mb-xs"><strong className="font-bold">Müşteri:</strong> {order.customerName}</p>
                            <p className="font-body-md text-on-surface mb-xs"><strong className="font-bold">Telefon:</strong> {order.customerPhone}</p>
                            <p className="font-body-md text-on-surface mt-sm pt-sm border-t border-outline-variant"><strong className="font-bold">Adres:</strong><br/>{order.address}</p>
                          </div>
                        </div>

                        {/* Sağ Taraf: Sipariş Verilen Ürünler ve Aksiyonlar */}
                        <div className="flex flex-col h-full justify-between gap-md">
                          <div>
                            <h4 className="font-headline-sm text-primary mb-sm flex items-center gap-xs">
                              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                              Sipariş İçeriği
                            </h4>
                            <div className="bg-surface rounded border border-outline-variant overflow-hidden">
                              <ul className="divide-y divide-outline-variant">
                                {order.items.map((item, idx) => (
                                  <li key={item.id || idx} className="p-sm flex justify-between items-center">
                                    <div>
                                      <p className="font-body-sm text-on-surface font-bold">{item.productName}</p>
                                      <p className="font-body-sm text-on-surface-variant">{item.price.toFixed(2)} ₺ x {item.quantity}</p>
                                    </div>
                                    <div className="font-body-sm text-primary font-bold">
                                      {(item.price * item.quantity).toFixed(2)} ₺
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              <div className="p-sm bg-surface-container-lowest flex justify-between items-center border-t border-outline-variant">
                                <span className="font-body-sm font-bold text-on-surface-variant">Genel Toplam:</span>
                                <span className="font-body-md font-bold text-primary">{order.totalAmount.toFixed(2)} ₺</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Aksiyonlar: Durum Güncelleme */}
                          <div className="bg-surface p-sm rounded border border-outline-variant flex flex-wrap items-center gap-sm">
                            <span className="font-label-technical text-on-surface-variant w-full md:w-auto">Siparişi Güncelle:</span>
                            <button 
                              disabled={updatingId === order.id || order.status === 'Bekliyor'}
                              onClick={() => updateStatus(order.id, 'Bekliyor')}
                              className={`px-sm py-xs rounded font-button-text text-[12px] transition-colors ${order.status === 'Bekliyor' || order.status === 'PENDING' ? 'bg-secondary-container text-on-secondary-container font-bold border-2 border-secondary' : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest'}`}
                            >
                              Bekliyor
                            </button>
                            <button 
                              disabled={updatingId === order.id || order.status === 'Kargolandı'}
                              onClick={() => updateStatus(order.id, 'Kargolandı')}
                              className={`px-sm py-xs rounded font-button-text text-[12px] transition-colors ${order.status === 'Kargolandı' ? 'bg-tertiary-container text-on-tertiary-container font-bold border-2 border-tertiary' : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest'}`}
                            >
                              Kargolandı
                            </button>
                            <button 
                              disabled={updatingId === order.id || order.status === 'Tamamlandı'}
                              onClick={() => updateStatus(order.id, 'Tamamlandı')}
                              className={`px-sm py-xs rounded font-button-text text-[12px] transition-colors ${order.status === 'Tamamlandı' ? 'bg-primary-container text-on-primary-container font-bold border-2 border-primary' : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest'}`}
                            >
                              Tamamlandı
                            </button>
                            <button 
                              disabled={updatingId === order.id || order.status === 'İptal Edildi'}
                              onClick={() => updateStatus(order.id, 'İptal Edildi')}
                              className={`px-sm py-xs rounded font-button-text text-[12px] transition-colors ${order.status === 'İptal Edildi' ? 'bg-error-container text-on-error-container font-bold border-2 border-error' : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest'}`}
                            >
                              İptal Et
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
