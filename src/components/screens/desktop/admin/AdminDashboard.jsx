import { useState, useEffect } from 'react'
import { getAdminStats, getAdminOrders } from '@/services/admin'

const statusColor = {
    pending:   'bg-yellow-100 text-yellow-700',
    paid:      'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
}

export default function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, ordersRes] = await Promise.all([
                    getAdminStats(),
                    getAdminOrders(),
                ])
                setStats(statsRes.data)
                setOrders(ordersRes.data)
            } catch (err) {
                setError('โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const statCards = [
        { label: 'ยอดขายรวม',    value: stats ? `฿${stats.totalRevenue.toLocaleString()}` : '—', accent: true },
        { label: 'จำนวนออเดอร์', value: stats ? stats.totalOrders : '—' },
        { label: 'จำนวนสินค้า',  value: stats ? stats.totalProducts : '—' },
        { label: 'จำนวนลูกค้า',  value: stats ? stats.totalCustomers : '—' },
    ]

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#1C1C1A] mb-6">Dashboard</h1>

            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm">
                        <p className="text-sm text-[#8A8780]">{card.label}</p>
                        <p className={`text-3xl font-bold mt-1 ${card.accent ? 'text-[#5B8C5A]' : 'text-[#1C1C1A]'}`}>
                            {loading ? '—' : card.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#DDD9D0]">
                    <h2 className="text-base font-semibold text-[#1C1C1A]">ออเดอร์ล่าสุด</h2>
                </div>

                {!loading && orders.length === 0 ? (
                    <div className="px-6 py-12 text-center text-sm text-[#8A8780]">
                        ยังไม่มีออเดอร์
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-[#F8F6F2] text-[#8A8780]">
                            <tr>
                                <th className="text-left px-6 py-3 font-medium">Order ID</th>
                                <th className="text-left px-6 py-3 font-medium">ลูกค้า</th>
                                <th className="text-left px-6 py-3 font-medium">ยอดรวม</th>
                                <th className="text-left px-6 py-3 font-medium">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-t border-[#DDD9D0]">
                                    <td className="px-6 py-4 font-medium text-[#5B8C5A]">{order._id}</td>
                                    <td className="px-6 py-4 text-[#1C1C1A]">{order.userId}</td>
                                    <td className="px-6 py-4 text-[#1C1C1A]">฿{order.total?.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
