import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logos/ng-blu.png'
import authBgImage from '@/assets/images/misc/auth-bg.png'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100">
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          <div className="w-lg-500px p-10">{children}</div>
        </div>

        <div className="d-flex flex-center flex-wrap px-5">
          <div className="d-flex fw-semibold text-primary fs-base">
            <a href="#" className="px-5" target="_blank">
              Terms
            </a>

            <a href="#" className="px-5" target="_blank">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <div
        className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
        style={{ backgroundImage: `url(${authBgImage.src}` }}
      >
        <div className="d-flex flex-column flex-center py-15 px-5 px-md-15 w-100">
          <Link href="/" className="mb-12">
            <Image alt="Logo" src={logo} height={75} width={150} className="h-75px" />
          </Link>

          <h1 className="text-white fs-2qx fw-bolder text-center mb-7">
            Fast, Efficient and Productive
          </h1>

          <div className="text-white fs-base text-center">
            In this kind of post,{' '}
            <a href="#" className="opacity-75-hover text-warning fw-bold me-1">
              the blogger
            </a>
            introduces a person they’ve interviewed <br /> and provides some background information
            about
            <a href="#" className="opacity-75-hover text-warning fw-bold me-1">
              the interviewee
            </a>
            and their <br /> work following this is a transcript of the interview.
          </div>
        </div>
      </div>
    </div>
  )
}
