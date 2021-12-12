import React, { useEffect, useState } from 'react';
import '../css/intro.css';

const Home = () => {

    useEffect(() => {
        console.log(process.env.REACT_APP_URL_API);
        return () => {
            console.log("Intro");
        }
    }, [])

    return (

        <>

            <div style={{ marginTop: "126px", paddingBottom: "126px" }} className="tb_work_wrapper pb20">
                <div className="container">
                    <div className="row">

                        <div className="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                            <div className="tb_work_txt_wrapper">


                                <div className="abt_txt_box">
                                    <div className="tb_left_heading_wraper">
                                        <h4>Giải pháp quản lý tòa nhà văn phòng</h4>
                                        <h3>Hệ thống quản lý tòa nhà version 1.0.1</h3>
                                        <h2><span></span></h2>
                                    </div>
                                    <p>Hệ thống cho phép admin có thể quản lý các công ty thuê văn phòng trong tòa nhà cũng như thông tin
                                        về các mặt bằng mà công ty đó thuê, quản lý các dịch vụ trong tòa nhà và các nhân viên tòa nhà
                                    </p>

                                    <div className="abt_btn_wrapper">
                                        <a href="/contact">
                                            <div className="blob-btn abt_btn">
                                                Liên Hệ
                                                <span className="blob-btn__inner">
                                                    <span className="blob-btn__blobs">
                                                        <span className="blob-btn__blob"></span>
                                                        <span className="blob-btn__blob"></span>
                                                        <span className="blob-btn__blob"></span>
                                                        <span className="blob-btn__blob"></span>
                                                    </span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                            <div className="tb-flex-bdr-img">
                                <img src="https://scontent-sin6-1.xx.fbcdn.net/v/t1.15752-9/261962836_256384876493757_8182171597846667018_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=ae9488&_nc_ohc=T_2Pz6JSjLEAX9b9CH1&tn=OdnVT4pmUlCA1G2w&_nc_ht=scontent-sin6-1.xx&oh=0397248d9b438662014e216ac2b0192b&oe=61D9E39E" alt="About"
                                    className="img-responsive" />
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <hr />
            <hr />

            <div class="row" style={{ display: "block" }}>

                <a href="/floors">
                    <div class="jp_top_jobs_category_wrapper  ">
                        <div class="jp_top_jobs_category">

                            <h3>
                                Quản lý mặt bằng cho thuê
                            </h3>
                            <p>Module được thực hiện bởi ĐÀO QUANG HƯNG - B18DCCN278, cho phép quản lý danh sách các tầng, thông tin về các mặt bằng đã được thuê tại mỗi tầng,
                                đăng ký hợp đồng mặt bằng mới cho các công ty muốn thuê 
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/company">
                    <div class="jp_top_jobs_category_wrapper jp_top_clr_category_wrapper ">
                        <div class="jp_top_jobs_category">

                            <h3>
                                Quản lý các công ty thuê tại tòa nhà
                            </h3>
                            <p>Thực hiện bởi VŨ ĐÌNH CÔNG - B18DCCN062, cho phép quản lý danh sách các công ty thuê mặt bằng trong tòa nhà cũng như quản lý các nhân viên của công ty
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/service-management">
                    <div class="jp_top_jobs_category_wrapper  ">
                        <div class="jp_top_jobs_category">

                            <h3>
                                Quản lý các đầu mục dịch vụ, mức lương và nhân viên tòa nhà
                            </h3>
                            <p>Thực hiện bởi ĐÀO KỶ NGUYÊN - B18DCCN458 cho phép quản lý các đầu mục dịch vụ, mức lương của mỗi đầu mục dịch vụ và
                                các nhân viên cung cấp dịch vụ trong tòa nhà 
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/monthly-fee-statistics">
                    <div class="jp_top_jobs_category_wrapper jp_top_clr_category_wrapper ">
                        <div class="jp_top_jobs_category">

                            <h3>
                                Quản lý doanh thu, các dịch vụ được dùng bởi các công ty
                            </h3>
                            <p> Thực hiện bởi NGUYỄN CÔNG HUY - B18DCCN267 cho phép theo dõi số tiền mỗi công ty phải trả trong tháng
                                bao gồm tiền thuê mặt bằng cũng như tiền dịch vụ thỏa mãn các ràng buộc nghiệp vụ, quản lý các dịch vụ đang được thuê bởi các công ty, đăng ký thêm hoặc hủy dịch vụ
                            </p>
                        </div>
                    </div>
                </a>

            </div>

        </>
    )
}

export default Home;
