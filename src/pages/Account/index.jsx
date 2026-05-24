import "./Account.css";
import { useState } from "react";
import { Camera, Save } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedPage from "../../components/AnimatedPage.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { buttonMotion } from "../../utils/animations.js";

export default function Account() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
    bankName: user?.bankName || "",
    accountType: user?.accountType || "Checking account",
    agency: user?.agency || "",
    accountNumber: user?.accountNumber || ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleChange(field, value) {
    setSaved(false);
    setProfile((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleAvatarUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      handleChange("avatar", reader.result);
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateProfile(profile);
    setSaved(true);
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Your new password must have at least 6 characters.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("The new password confirmation does not match.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("qt_registered_users")) || [];

    const currentUser = storedUsers.find((item) => item.email === user?.email);

    if (!currentUser) {
      setPasswordError("Password change is available only for locally registered demo accounts.");
      return;
    }

    if (currentUser.password !== passwordData.currentPassword) {
      setPasswordError("The current password is incorrect.");
      return;
    }

    const updatedUsers = storedUsers.map((item) =>
      item.email === user?.email
        ? {
          ...item,
          password: passwordData.newPassword
        }
        : item
    );

    localStorage.setItem("qt_registered_users", JSON.stringify(updatedUsers));

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

    setPasswordMessage("Password updated successfully.");
  }

  return (
    <AnimatedPage>
      <PageHeader
        eyebrow="Client account"
        title="Profile and banking details"
        description="A front-end only account area where a demo client can edit profile information, profile picture and banking details."
      />

      <form className="account-grid" onSubmit={handleSubmit}>
        <motion.section
          className="account-card profile-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
        >
          <div className="avatar-preview">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile preview" />
            ) : (
              <span>{profile.name?.charAt(0) || "U"}</span>
            )}
          </div>

          <label className="avatar-upload">
            <Camera size={18} />
            Upload profile photo
            <input type="file" accept="image/*" onChange={handleAvatarUpload} />
          </label>

          <p>
            The photo is stored locally in the browser for demo purposes only.
          </p>
        </motion.section>

        <motion.section
          className="account-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <h2>Personal information</h2>

          <label>
            Full name
            <input
              value={profile.name}
              onChange={(event) => handleChange("name", event.target.value)}
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              value={profile.email}
              onChange={(event) => handleChange("email", event.target.value)}
            />
          </label>

          <label>
            Phone number
            <input
              value={profile.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
            />
          </label>
        </motion.section>

        <motion.section
          className="account-card account-card-wide"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          <h2>Banking details</h2>

          <div className="account-form-grid">
            <label>
              Bank name
              <input
                value={profile.bankName}
                onChange={(event) => handleChange("bankName", event.target.value)}
              />
            </label>

            <label>
              Account type
              <select
                value={profile.accountType}
                onChange={(event) => handleChange("accountType", event.target.value)}
              >
                <option>Checking account</option>
                <option>Savings account</option>
                <option>Business account</option>
                <option>International account</option>
              </select>
            </label>

            <label>
              Agency / Branch
              <input
                value={profile.agency}
                onChange={(event) => handleChange("agency", event.target.value)}
              />
            </label>

            <label>
              Account number
              <input
                value={profile.accountNumber}
                onChange={(event) => handleChange("accountNumber", event.target.value)}
              />
            </label>
          </div>

          <motion.button className="primary-button account-save-button" {...buttonMotion}>
            <Save size={18} />
            Save account details
          </motion.button>

          {saved && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Account details updated successfully.
            </motion.div>
          )}
        </motion.section>

        <motion.section
          className="account-card account-card-wide"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <h2>Security settings</h2>

          <p className="account-section-description">
            Update the password used to access this local demo account.
          </p>

          <div className="account-form-grid">
            <label>
              Current password
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(event) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: event.target.value
                  })
                }
              />
            </label>

            <label>
              New password
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(event) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: event.target.value
                  })
                }
              />
            </label>

            <label>
              Confirm new password
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(event) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: event.target.value
                  })
                }
              />
            </label>
          </div>

          <motion.button
            type="button"
            className="secondary-button password-save-button"
            onClick={handlePasswordSubmit}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Update password
          </motion.button>

          {passwordMessage && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {passwordMessage}
            </motion.div>
          )}

          {passwordError && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {passwordError}
            </motion.div>
          )}
        </motion.section>
      </form>
    </AnimatedPage>
  );
}
