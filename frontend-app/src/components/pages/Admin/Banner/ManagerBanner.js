import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getBanners } from "../../../../services/BannerService";
export default function ManagerBanner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await getBanners();
      if (res.success === true) {
        console.log(res.banners.data);
        setBanners(res.banners.data);
      }
    };
    fetchBanners();
  }, []);
  return (
    <div className="app-main__inner">
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
              <i className="pe-7s-ticket icon-gradient bg-mean-fruit" />
            </div>
            <div>
              Banner
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
                    defaultValue
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
                    <th className="text-center">Hỉnh ảnh</th>
                    <th className="text-center">Title</th>
                    <th className="text-center">Số thứ xuất hiện</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.length > 0 &&
                    banners.map((banner) => (
                      <tr>
                        <td className="text-center text-muted">#01</td>
                        <td className="text-center">
                          <img
                            src="assets/images/avatars/1.png"
                            width={50}
                            height={50}
                            alt-=""
                          />
                        </td>
                        <td className="text-center">{banner?.title}</td>
                        <td className="text-center">{banner?.position}</td>
                        <td className="text-center">
                          <span
                            className={`badge badge-${
                              banner?.status === 1 ? "success" : "danger"
                            }`}
                          >
                            {banner?.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="text-center">
                          <NavLink
                            to="1/edit"
                            data-toggle="tooltip"
                            title="Edit"
                            data-placement="bottom"
                            className="btn btn-outline-warning border-0 btn-sm"
                          >
                            <span className="btn-icon-wrapper opacity-8">
                              <i className="fa fa-edit fa-w-20" />
                            </span>
                          </NavLink>
                          <form className="d-inline" action method="post">
                            <button
                              className="btn btn-hover-shine btn-outline-danger border-0 btn-sm"
                              type="submit"
                              data-toggle="tooltip"
                              title="Delete"
                              data-placement="bottom"
                              onclick="return confirm('Do you really want to delete this item?')"
                            >
                              <span className="btn-icon-wrapper opacity-8">
                                <i className="fa fa-trash fa-w-20" />
                              </span>
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="d-block card-footer">
              {/* {"{"}
              {"{"} $posts-&gt;links('pagination::bootstrap-5') {"}"} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
