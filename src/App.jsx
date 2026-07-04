import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FlowSwitcher } from '@/components/FlowSwitcher'
import { DemoBanner } from '@/components/DemoBanner'

// Parent pages
import { Welcome } from '@/pages/Welcome'
import { ParentRegister } from '@/pages/parent/ParentRegister'
import { EmailVerify } from '@/pages/parent/EmailVerify'
import { ParentDashboardPending } from '@/pages/parent/ParentDashboardPending'
import { ChildRegister } from '@/pages/parent/ChildRegister'
import { ParentDashboardActive } from '@/pages/parent/ParentDashboardActive'
import { QRCode } from '@/pages/parent/QRCode'
import { LiveTracking } from '@/pages/parent/LiveTracking'

// Driver pages
import { DriverLogin } from '@/pages/driver/DriverLogin'
import { TodaysRoute } from '@/pages/driver/TodaysRoute'
import { ApproachingStop } from '@/pages/driver/ApproachingStop'
import { QRScan } from '@/pages/driver/QRScan'
import { ScanConfirmed } from '@/pages/driver/ScanConfirmed'

// Admin pages
import { SchoolAdminDashboard } from '@/pages/admin/SchoolAdminDashboard'
import { PendingChildDetail } from '@/pages/admin/PendingChildDetail'
import { ApprovalConfirmed } from '@/pages/admin/ApprovalConfirmed'
import { SuperAdminDashboard } from '@/pages/admin/SuperAdminDashboard'
import { GuardianGrantReview } from '@/pages/admin/GuardianGrantReview'
import { OperatorPendingDetail } from '@/pages/admin/OperatorPendingDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background max-w-[430px] mx-auto relative">
        <DemoBanner />
        <Routes>
          <Route path="/" element={<Welcome />} />

          {/* Parent flow */}
          <Route path="/parent/register" element={<ParentRegister />} />
          <Route path="/parent/verify-email" element={<EmailVerify />} />
          <Route path="/parent/dashboard" element={<ParentDashboardPending />} />
          <Route path="/parent/register-child" element={<ChildRegister />} />
          <Route path="/parent/dashboard-active" element={<ParentDashboardActive />} />
          <Route path="/parent/qr" element={<QRCode />} />
          <Route path="/parent/tracking" element={<LiveTracking />} />

          {/* Driver flow */}
          <Route path="/driver" element={<DriverLogin />} />
          <Route path="/driver/route" element={<TodaysRoute />} />
          <Route path="/driver/approaching" element={<ApproachingStop />} />
          <Route path="/driver/scan" element={<QRScan />} />
          <Route path="/driver/confirmed" element={<ScanConfirmed />} />

          {/* Admin flow */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<SchoolAdminDashboard />} />
          <Route path="/admin/children/:id" element={<PendingChildDetail />} />
          <Route path="/admin/children/:id/approved" element={<ApprovalConfirmed />} />
          <Route path="/admin/super" element={<SuperAdminDashboard />} />
          <Route path="/admin/guardian-grants/:id" element={<GuardianGrantReview />} />
          <Route path="/admin/operators/:id" element={<OperatorPendingDetail />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <FlowSwitcher />
      </div>
    </BrowserRouter>
  )
}
