import Image from 'next/image'
import { Button } from 'react-bootstrap'

import avatar from '@/assets/images/avatars/300-3.jpg'
import { Drawer } from '@/components/drawer'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { KTIcon } from '@/components/kt-icon/kt-icon'

import useEnterpriseForm from './enterprise-form.hook'

export const FormDrawer = () => {
  const { methods, onSubmit } = useEnterpriseForm()

  return (
    <Drawer id="enterprise_root">
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <h4 className="text-gray-900 fw-bolder fs-6 fs-lg-4 mb-3">Company Info</h4>
        <ControlledInput
          label="Name"
          name="name"
          className="form-control-solid"
          containerClass="mb-3"
        />
        <ControlledInput
          label="Address"
          name="address"
          className="form-control-solid"
          containerClass="mb-3"
        />
        <ControlledInput
          label="KVK Number"
          name="kvkNumber"
          className="form-control-solid"
          containerClass="mb-3"
        />

        <h4 className="text-gray-900 fw-bolder fs-6 fs-lg-4 mt-7 mb-2">Contacts</h4>
        <div className="table-responsive">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="w-25px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      data-kt-check="true"
                      data-kt-check-target=".widget-9-check"
                    />
                  </div>
                </th>
                <th className="min-w-150px">Name</th>
                <th className="min-w-140px">Department</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <Image src={avatar} alt="" />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
                        Ana Simmons
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Director
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">HR</span>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <Image src={avatar} alt="" />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
                        Jessie Clarcson
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Recruiter
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">HR</span>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <Image src={avatar} alt="" />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
                        Dan Wilson
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Recruiter
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">HR</span>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="text-gray-900 fw-bolder fs-6 fs-lg-4 mt-7 mb-2">Users</h4>
        <div className="table-responsive">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="w-25px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      data-kt-check="true"
                      data-kt-check-target=".widget-9-check"
                    />
                  </div>
                </th>
                <th className="min-w-150px">Name</th>
                <th className="min-w-140px">Department</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <Image src={avatar} alt="" />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
                        Ana Simmons
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Director
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">HR</span>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <Image src={avatar} alt="" />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
                        Jessie Clarcson
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Recruiter
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">HR</span>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input widget-9-check" type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <Image src={avatar} alt="" />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
                        Dan Wilson
                      </a>
                      <span className="text-muted fw-semibold text-muted d-block fs-7">
                        Recruiter
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-muted fw-semibold text-muted d-block fs-7">HR</span>
                </td>
                <td>
                  <div className="d-flex justify-content-end flex-shrink-0">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Button type="submit" variant="light-primary" className="mt-7 w-100">
          <KTIcon iconName="save-2" />
          Update
        </Button>
        <Button type="button" variant="light-danger" className="mt-3 w-100">
          <KTIcon iconName="trash" />
          Delete
        </Button>
      </FormProvider>
    </Drawer>
  )
}
