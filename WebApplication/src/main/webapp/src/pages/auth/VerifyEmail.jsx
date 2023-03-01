import { useEffect, useState } from "react";
import Helmet from "../../components/Helmet";
import Section, {
  SectionBody,
  SectionTitle,
} from "../../components/UI/Section";
import styles from "./auth.module.scss";
import Card from "../../components/UI/Card";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const [token, setToken] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setToken(searchParams.get("code"));
  }, [token]);
  const handleConfirmation = async () => {
    try {
      const response = await UserService.verifyEmail(token);
      if (response.status === 200) {
        setIsConfirmed(true);
      }
    } catch (e) {
      toast.error("Token hết hạn hoặc không hợp lệ");
    }
  };
  return (
    <div>
      <Helmet title="Xác nhận địa chỉ email" />
      <section className={` container ${styles.auth}`}>
        <div className={styles.main}>
          <Card className={styles.card}>
            <h3>Xác nhận email</h3>
            {isConfirmed ? (
              <div className={styles.message}>
                <div className="success-checkmark">
                  <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                  </div>
                </div>
                Cảm ơn bạn đã xác nhận địa chỉ email của mình!
                <Link to="/login" className="--btn --btn-primary">
                  Đăng nhập
                </Link>
              </div>
            ) : (
              <>
                <p className={styles.message}>
                  Cảm ơn bạn đã đăng ký tài khoản.
                </p>
                <p className={styles.message}>
                  Vui lòng xác nhận địa chỉ email của bạn bằng cách nhấp vào nút
                  bên dưới.
                </p>
                <button
                  className="--btn --btn-primary"
                  onClick={handleConfirmation}
                >
                  Xác nhận
                </button>
              </>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
};
export default VerifyEmail;
