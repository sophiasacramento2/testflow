import {
  LayoutDashboard,
  ClipboardCheck,
  CirclePlus,
  Info,
  FlaskConical
} from 'lucide-react'

import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <img src={logo} alt="Logo TestFlow" />
      </div>

      <div className="sidebar-label">
        MENU PRINCIPAL
      </div>

      <nav className="sidebar-menu">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'menu-item active' : 'menu-item'
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/casos"
          className={({ isActive }) =>
            isActive ? 'menu-item active' : 'menu-item'
          }
        >
          <ClipboardCheck size={20} />
          <span>Casos de Teste</span>
        </NavLink>

        <NavLink
          to="/novo-caso"
          className={({ isActive }) =>
            isActive ? 'menu-item active' : 'menu-item'
          }
        >
          <CirclePlus size={20} />
          <span>Novo Caso</span>
        </NavLink>

        <NavLink
          to="/sobre"
          className={({ isActive }) =>
            isActive ? 'menu-item active' : 'menu-item'
          }
        >
          <Info size={20} />
          <span>Sobre</span>
        </NavLink>

      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-icon">
          <FlaskConical size={20} />
        </div>

        <div>
          <strong>TestFlow</strong>
          <span>Gestão de testes</span>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar