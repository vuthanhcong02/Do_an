import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  getRegistrations,
  deleteRegistration,
} from "../../../services/RegistrationService";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function ManagerRegistration() {
  const { register, handleSubmit, setValue } = useForm();
  const [registrations, setRegistrations] = useState([]);
  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    setValue("status", registrations?.status);
  }, [registrations]);
  const fetchRegistrations = async () => {
    const { success, data } = await getRegistrations();
    if (success) {
      setRegistrations(data?.data);
    }
  };

  const handleUpdate = async (id, newStatus) => {
    // Gọi API để cập nhật trạng thái
    try {
      const response = await axios.put(
        `http://api.ngoaingutinhoc.tech.com/api/registrations/${id}`,
        {
          status: newStatus,
        }
      );
      if (response.data.success) {
        window.location.href = "/admin/registrations";
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(" có chắc chắn muốn xóa bản ghi này?");
    if (confirmDelete) {
      const { success } = await deleteRegistration(id);
      if (success) {
        const newRegistrations = registrations.filter((item) => item.id !== id);
        setRegistrations(newRegistrations);
        toast.success("Xóa bản ghi thành công");
      } else {
        toast.error("Xóa bản ghi thất bại");
      }
    }
  };

  return (
    <div className="app-main__inner">
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
              <i className="pe-7s-ticket icon-gradient bg-mean-fruit" />
            </div>
            <div>
              Registrations
              <div className="page-title-subheading">
                View, create, update, delete and manage.
              </div>
            </div>
          </div>
          <div className="page-title-actions">
            <NavLink
              to="create"
              className="btn-shadow btn-hover-shine mr-3 btn btn-primary"
            >
              <span className="btn-icon-wrapper pr-2 opacity-7">
                <i className="fa fa-plus fa-w-20" />
              </span>
              Create
            </NavLink>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="main-card mb-3 card">
            <div className="card-header">
              <form>
                <div className="input-group">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search everything"
                    className="form-control"
                  />
                  <span className="input-group-append">
                    <button type="submit" className="btn btn-primary">
                      <i className="fa fa-search" />
                      &nbsp; Search
                    </button>
                  </span>
                </div>
              </form>
              <div className="btn-actions-pane-right">
                <div role="group" className="btn-group-sm btn-group">
                  <button className="btn btn-focus">This week</button>
                  <button className="active btn btn-focus">Anytime</button>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Họ và tên</th>
                    <th className="text-center">Khóa học</th>
                    <th className="text-center">Lớp</th>
                    <th className="text-center">Ngày đăng kí</th>
                    <th className="text-center">Tổng tiền</th>
                    <th className="text-center">Hình thức thanh toán</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="text-center">{item?.user?.full_name}</td>
                      <td className="text-center">
                        {item?.schedule?.course?.name}
                      </td>
                      <td className="text-center">
                        {item?.schedule?.class?.name}
                      </td>
                      <td className="text-center">
                        {moment(item?.created_at).format("DD/MM/YYYY")}
                      </td>
                      <td className="text-center">1.000.000 VND</td>
                      <td className="text-center">{item?.payment_type}</td>

                      <td className="text-center ">
                        <select
                          value={item?.status}
                          className={`form-control-sm badge ${
                            item.status === "success"
                              ? "badge-success"
                              : "badge-danger"
                          }`}
                          onChange={(e) =>
                            handleUpdate(item.id, e.target.value)
                          }
                        >
                          <option value="pending">Đang xử lí</option>
                          <option value="success">Thành công</option>
                        </select>
                        {/* <span
                          className={`badge badge-${
                            item?.status === "success" ? "success" : "danger"
                          }`}
                        >
                          {item?.status === "pending" ? "Pending" : "Success"}
                        </span> */}
                      </td>
                      <td className="text-center">
                        {/* <NavLink
                          to={`${item.id}/edit`}
                          data-toggle="tooltip"
                          title="Edit"
                          data-placement="bottom"
                          className="btn btn-outline-warning border-0 btn-sm"
                        >
                          <span className="btn-icon-wrapper opacity-8">
                            <i className="fa fa-edit fa-w-20" />
                          </span>
                        </NavLink> */}
                        <button
                          className="btn btn-hover-shine btn-outline-danger border-0 btn-sm"
                          type="submit"
                          data-toggle="tooltip"
                          title="Delete"
                          data-placement="bottom"
                          onClick={() => handleDelete(item.id)}
                        >
                          <span className="btn-icon-wrapper opacity-8">
                            <i className="fa fa-trash fa-w-20" />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* {"{"}
        {"{"}--{" "} */}
            {/* <div className="d-block card-footer">
          {"{"}
          {"{"} $posts-&gt;links('pagination::bootstrap-5') {"}"}
          {"}"}
        </div>{" "}
        --{"}"}
        {"}"} */}
          </div>
        </div>
      </div>
    </div>
  );
}
