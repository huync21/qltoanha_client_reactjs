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
                                        <h4>Chào Mừng Bạn Đến Với Bidland GROUP</h4>
                                        <h3>TẠI SAO BẠN N&#202;N L&#192;M VIỆC VỚI CH&#218;NG T&#212;I</h3>
                                        <h2><span></span></h2>
                                    </div>
                                    <p>Sự ra đời của nhiều sản phẩm c&ocirc;ng nghệ trong c&aacute;ch mạng c&ocirc;ng nghiệp 4.0
                                        l&agrave;m thay đổi bức tranh chung của nhiều ng&agrave;nh, trong đ&oacute; phải kể đến
                                        bất động sản. Nhiều...</p>

                                    <div className="abt_btn_wrapper">
                                        <a href="/thu-ngo/tai-sao-ban-nen-lam-viec-voi-chung-toi">
                                            <div className="blob-btn abt_btn">
                                                Xem Thêm
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
                                <img src="http://bidlandgroup.vn/UploadFile/Images/637420862878439507_tsssss.png" alt="About"
                                    className="img-responsive" />
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <hr />
            <hr />

            <div class="row" style={{ display: "block" }}>

                <a href="/gioi-thieu#su-menh">
                    <div class="jp_top_jobs_category_wrapper  ">
                        <div class="jp_top_jobs_category">

                            <h3>
                                SỨ MỆNH
                            </h3>
                            <p>Qua hoạt động của m&igrave;nh, BIDLAND GROUP đem lại cho người lao động của
                                c&ocirc;ng ty
                                kh&ocirc;ng chỉ thu nhập cao, m&agrave; c&ograve;n một m&ocirc;i trường l&agrave;m
                                việc
                                hiện đại, năng động, hiệu quả c&ugrave;ng với những cơ hội học tập n&acirc;ng cao kỹ
                                năng chuy&ecirc;n m&ocirc;n, r&egrave;n luyện bản lĩnh va thăng tiến trong
                                c&ocirc;ng
                                việc.
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/gioi-thieu#tam-nhin">
                    <div class="jp_top_jobs_category_wrapper jp_top_clr_category_wrapper ">
                        <div class="jp_top_jobs_category">

                            <h3>
                                TẦM NH&#204;N
                            </h3>
                            <p>BIDLAND GROUP nỗ lực phấn đấu ph&aacute;t triển bền vững, trở th&agrave;nh doanh
                                nghiệp
                                h&agrave;ng đầu Việt Nam trong lĩnh vực đầu tư, kinh doanh v&agrave; quản l&yacute;
                                bất
                                động sản. BIDLAND GROUP sẽ l&agrave; nơi kh&aacute;ch h&agrave;ng trao gửi niềm tin
                                trọn
                                vẹn, l&agrave; nơi người lao động cống hiến hết m&igrave;nh, cổ đ&ocirc;ng
                                ho&agrave;n
                                to&agrave;n h&agrave;i l&ograve;ng v&agrave; cộng đồng được hưởng nhiều lợi
                                &iacute;ch.
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/gioi-thieu#gia-tri-cot-loi">
                    <div class="jp_top_jobs_category_wrapper  ">
                        <div class="jp_top_jobs_category">

                            <h3>
                                GI&#193; TRỊ CỐT L&#213;I
                            </h3>
                            <p>Uy t&iacute;n &ndash; Chất lượng &ndash; Hiệu quả l&agrave; những yếu tố h&agrave;ng
                                đầu
                                m&agrave; BIDLAND GROUP lu&ocirc;n hướng tới trong qu&aacute; tr&igrave;nh
                                ph&aacute;t
                                triển.
                                Chất lượng sản phẩm v&agrave; dịch vụ được coi l&agrave; nền tảng của sự ph&aacute;t
                                triển bền vững của BIDLAND GROUP. Tạo niềm tin cho Kh&aacute;ch h&agrave;ng về chất
                                lượng sản phẩm v&agrave; dịch vụ bất động sản.
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/gioi-thieu#chat-luong-dich-vu">
                    <div class="jp_top_jobs_category_wrapper jp_top_clr_category_wrapper ">
                        <div class="jp_top_jobs_category">

                            <h3>
                                CHẤT LƯỢNG DỊCH VỤ
                            </h3>
                            <p>Lu&ocirc;n thỏa m&atilde;n nhu cầu của kh&aacute;ch h&agrave;ng. Mang lại lợi
                                &iacute;ch
                                lớn nhất cho kh&aacute;ch h&agrave;ng khi đến với BIDLAND GROUP
                            </p>
                        </div>
                    </div>
                </a>

            </div>

        </>
    )
}

export default Home;
