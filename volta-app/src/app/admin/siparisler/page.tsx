import { prisma } from "@/lib/prisma";
import OrderList from "./OrderList";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true } // Include items to show order details
  });

  return (
    <div className="flex flex-col gap-lg fade-in">
      <div>
        <h1 className="font-display-sm text-primary mb-xs">Sipariş Yönetimi</h1>
        <p className="font-body-md text-on-surface-variant">
          Müşterilerinizin verdiği tüm siparişleri buradan inceleyebilirsiniz.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface">
          <h2 className="font-headline-sm text-primary">Tüm Siparişler</h2>
          <span className="font-body-sm text-on-surface-variant bg-surface-variant px-sm py-xs rounded">
            Toplam: {orders.length}
          </span>
        </div>
        
        <OrderList orders={orders} />
      </div>
    </div>
  );
}
