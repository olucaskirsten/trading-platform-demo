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
      </form>
    </AnimatedPage>
  );
}
