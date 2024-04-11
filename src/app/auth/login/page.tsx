import Image from 'next/image'

import microsoftIcon from '@/assets/images/brand-logos/microsoft-5.svg'

export default function Login() {
  return (
    <form className="form w-100" noValidate id="kt_login_signin_form">
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
        <div className="text-gray-500 fw-semibold fs-6">Sign in to InfraOrders 2.0</div>
      </div>

      <div className="row g-3 mb-9">
        <div className="col-md-8 offset-md-2">
          <a
            href="#"
            className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
          >
            <Image alt="Logo" src={microsoftIcon} width={15} height={15} className="h-15px me-3" />
            Sign in with Microsoft
          </a>
        </div>
      </div>
    </form>
  )
}
