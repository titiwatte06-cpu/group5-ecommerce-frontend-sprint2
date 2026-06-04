import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context/useCart'
import { SHIPPING_FEE } from '@/data/cart'
import { acceptedPayments } from '@/data/paymentMethods'
import { getAddresses } from '@/services/user'

const timeSlots = [
  { label: 'เร็วที่สุด', sub: '~45 นาที' },
  { label: '12:00–13:00', sub: '' },
  { label: '13:00–14:00', sub: '' },
  { label: '14:00–15:00', sub: '' },
]

export default function DCartCheckoutScreen() {
  const navigate = useNavigate()
  const { items, subtotal, total, incrementQty, decrementQty, removeItem } = useCart()
  const [selectedSlot, setSelectedSlot] = useState(0)
  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [addrLoading, setAddrLoading] = useState(true)

  useEffect(() => {
    getAddresses()
      .then((res) => {
        const data = res.data ?? []
        setAddresses(data)
        const defaultAddr = data.find((a) => a.isDefault)
        if (defaultAddr) setSelectedAddressId(defaultAddr._id)
      })
      .catch(() => {})
      .finally(() => setAddrLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F6F2] font-['DM_Sans']">
      <div className="max-w-281.5 mx-auto px-8 py-8 flex gap-7 items-start">
        {/* ───── Left column ───── */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <h1 className="text-[16px] font-bold text-[#1C1C1A]">
            ตะกร้าของฉัน ({items.length} รายการ)
          </h1>

          {/* Cart items */}
          <div className="flex flex-col gap-3">
            {items.length === 0 && (
              <p className="text-[14px] text-[#8A8780]">ตะกร้าของคุณว่างเปล่า</p>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#DDD9D0] p-4 flex gap-4 items-center"
              >
                <div className="w-16 h-16 rounded-xl bg-[#EDEAE3] shrink-0" />

                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#1C1C1A]">{item.name}</p>
                  <p className="text-[12px] text-[#8A8780] mt-0.5">{item.note}</p>
                </div>

                {/* Qty controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => decrementQty(item.id)}
                    className="w-7 h-7 rounded-lg border border-[#DDD9D0] flex items-center justify-center text-[#8A8780] text-[14px] hover:bg-[#EDEAE3]"
                  >
                    −
                  </button>
                  <span className="text-[14px] font-bold text-[#1C1C1A] w-5 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => incrementQty(item.id)}
                    className="w-7 h-7 rounded-lg bg-[#5B8C5A] flex items-center justify-center text-white text-[14px] hover:bg-[#4a7249]"
                  >
                    +
                  </button>
                </div>

                {/* Price + remove */}
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className="text-[14px] font-bold text-[#1C1C1A]">฿{item.price * item.qty}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[12px] text-[#D95B5B] hover:underline"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery address */}
          <div className="bg-white rounded-2xl border border-[#DDD9D0] p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#D95B5B] text-[14px]">📍</span>
              <p className="text-[13px] font-semibold text-[#1C1C1A]">ที่อยู่จัดส่ง</p>
            </div>
            {addrLoading ? (
              <p className="text-[12px] text-[#8A8780]">กำลังโหลด...</p>
            ) : addresses.length === 0 ? (
              <p className="text-[12px] text-[#8A8780]">ยังไม่มีที่อยู่ กรุณาเพิ่มที่อยู่ก่อน</p>
            ) : (
              addresses.map((addr) => (
                <div
                  key={addr._id}
                  onClick={() => setSelectedAddressId(addr._id)}
                  className={`rounded-xl border-[1.5px] px-4 py-3 mb-3 cursor-pointer transition-colors ${
                    selectedAddressId === addr._id
                      ? 'bg-[#EAF2EA] border-[#5B8C5A]'
                      : 'bg-white border-[#DDD9D0] hover:bg-[#EDEAE3]'
                  }`}
                >
                  <p className="text-[12px] font-semibold text-[#1C1C1A]">{addr.label} — {addr.recieveName}</p>
                  <p className="text-[12px] text-[#8A8780] mt-0.5">{addr.recieveAddress}</p>
                </div>
              ))
            )}
            <button className="text-[12px] text-[#5B8C5A] hover:underline">
              + เพิ่มที่อยู่ใหม่
            </button>
          </div>

          {/* Delivery time */}
          <div className="bg-white rounded-2xl border border-[#DDD9D0] p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[14px]">🕐</span>
              <p className="text-[13px] font-semibold text-[#1C1C1A]">เวลาจัดส่ง</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSlot(i)}
                  className={`rounded-xl py-2.5 px-2 text-center border-[1.5px] transition-colors ${
                    selectedSlot === i
                      ? 'bg-[#EAF2EA] border-[#5B8C5A] text-[#3A6439]'
                      : 'bg-white border-[#DDD9D0] text-[#8A8780]'
                  }`}
                >
                  <p className="text-[11px] font-semibold">{slot.label}</p>
                  {slot.sub && <p className="text-[10px] mt-0.5">{slot.sub}</p>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ───── Right column ───── */}
        <div className="w-80 shrink-0 flex flex-col gap-4">
          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-[#DDD9D0] p-5">
            <p className="text-[14px] font-bold text-[#1C1C1A] mb-4">สรุปคำสั่งซื้อ</p>

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between">
                <span className="text-[13px] text-[#8A8780]">ราคาสินค้า</span>
                <span className="text-[13px] text-[#8A8780]">฿{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] text-[#8A8780]">ค่าจัดส่ง</span>
                <span className="text-[13px] text-[#8A8780]">฿{SHIPPING_FEE}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] text-[#8A8780]">ส่วนลด</span>
                <span className="text-[13px] text-[#8A8780]">-฿0</span>
              </div>
            </div>

            <div className="h-px bg-[#DDD9D0] mb-4" />

            <div className="flex justify-between mb-5">
              <span className="text-[15px] font-bold text-[#1C1C1A]">รวม</span>
              <span className="text-[15px] font-bold text-[#5B8C5A]">฿{total}</span>
            </div>

            {/* Coupon input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="กรอกส่วนลด"
                className="flex-1 h-10 rounded-xl bg-[#EDEAE3] px-3 text-[13px] text-[#1C1C1A] border-none outline-none placeholder:text-[#8A8780]"
              />
              <button className="h-10 px-4 rounded-xl border-[1.5px] border-[#5B8C5A] text-[#5B8C5A] text-[13px] font-semibold hover:bg-[#EAF2EA] transition-colors">
                ใช้
              </button>
            </div>

            <button
              onClick={() => {
                if (!selectedAddressId) return
                navigate('/payment', { state: { addressId: selectedAddressId } })
              }}
              disabled={!selectedAddressId}
              className="w-full h-12 rounded-xl bg-[#5B8C5A] text-white text-[14px] font-semibold hover:bg-[#4a7249] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ดำเนินการชำระเงิน →
            </button>
          </div>

          {/* Payment methods */}
          <div className="bg-white rounded-2xl border border-[#DDD9D0] px-5 py-4">
            <p className="text-[12px] font-semibold text-[#8A8780] mb-3">รับชำระผ่าน</p>
            <div className="flex gap-2">
              {acceptedPayments.map((method) => (
                <div
                  key={method.id}
                  title={method.label}
                  className="w-11 h-9 rounded-lg bg-[#EDEAE3] flex items-center justify-center text-[16px]"
                >
                  {method.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
