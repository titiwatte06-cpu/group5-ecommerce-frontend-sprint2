import { useState, useEffect } from 'react'
import { getProducts } from '@/services/product'
import { getCategories } from '@/services/category'

const tagColor = {
    'Best Seller': 'bg-green-100 text-green-700',
    'New':         'bg-blue-100 text-blue-700',
    'Best Value':  'bg-yellow-100 text-yellow-700',
    'Popular':     'bg-purple-100 text-purple-700',
}

export default function AdminProducts() {
    const [products, setProducts] = useState([])
    const [categoryMap, setCategoryMap] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    getProducts(),
                    getCategories(),
                ])
                setProducts(productsRes.data ?? [])

                const map = Object.fromEntries(
                    (categoriesRes.data ?? []).map((c) => [c._id, c.categoryname])
                )
                setCategoryMap(map)
            } catch (err) {
                setError('โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#1C1C1A] mb-6">Products</h1>

            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#DDD9D0]">
                    <h2 className="text-base font-semibold text-[#1C1C1A]">
                        รายการสินค้า {!loading && `(${products.length})`}
                    </h2>
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-[#F8F6F2] text-[#8A8780]">
                        <tr>
                            <th className="text-left px-6 py-3 font-medium">#</th>
                            <th className="text-left px-6 py-3 font-medium">ชื่อสินค้า</th>
                            <th className="text-left px-6 py-3 font-medium">หมวดหมู่</th>
                            <th className="text-left px-6 py-3 font-medium">ราคา</th>
                            <th className="text-left px-6 py-3 font-medium">แคลอรี่</th>
                            <th className="text-left px-6 py-3 font-medium">Tag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#8A8780]">
                                    กำลังโหลด...
                                </td>
                            </tr>
                        ) : products.map((product, index) => (
                            <tr key={product._id} className="border-t border-[#DDD9D0]">
                                <td className="px-6 py-4 text-[#8A8780]">{index + 1}</td>
                                <td className="px-6 py-4 text-[#1C1C1A] font-medium">{product.productname}</td>
                                <td className="px-6 py-4 text-[#8A8780]">
                                    {categoryMap[product.categoryId] ?? '—'}
                                </td>
                                <td className="px-6 py-4 text-[#1C1C1A]">฿{product.price}</td>
                                <td className="px-6 py-4 text-[#1C1C1A]">
                                    {product.kcal ? `${product.kcal} kcal` : '—'}
                                </td>
                                <td className="px-6 py-4">
                                    {product.tag ? (
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tagColor[product.tag] ?? 'bg-gray-100 text-gray-600'}`}>
                                            {product.tag}
                                        </span>
                                    ) : (
                                        <span className="text-[#C5C1BA]">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
