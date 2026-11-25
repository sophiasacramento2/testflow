function StatusCard({ icon, color, label, value, description }) {
  return (
    <div className="status-card">
      <div className="card-top">
        <div className={`card-icon ${color}-icon`}>
          {icon}
        </div>

        <span>{label}</span>
      </div>

      <strong>{value}</strong>
      <p>{description}</p>
    </div>
  )
}

export default StatusCard
