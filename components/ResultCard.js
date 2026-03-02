export default function ResultCard({ title, children, className = '' }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}
