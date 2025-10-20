import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const AddMemberForm = ({ onAddMember }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    department: 'Engineering',
    avatar: '👨‍💼',
    skills: []
  });
  const [currentSkill, setCurrentSkill] = useState('');

  const avatarOptions = ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍🔬', '👩‍🔬'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.role && formData.email) {
      onAddMember({
        ...formData,
        id: Date.now(),
        joinDate: new Date().toISOString().split('T')[0]
      });
      setFormData({
        name: '',
        role: '',
        email: '',
        department: 'Engineering',
        avatar: '👨‍💼',
        skills: []
      });
      setIsFormVisible(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="add-member-section">
      <button 
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="btn-primary toggle-form-btn"
      >
        <Plus size={20} />
        Add Team Member
      </button>

      {isFormVisible && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h3>Add New Team Member</h3>
              <button 
                onClick={() => setIsFormVisible(false)}
                className="btn-close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="member-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>

                <div className="form-group">
                  <label>Role *</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Frontend Developer"
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="email@company.com"
                  />
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <select 
                    name="department" 
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Avatar</label>
                <div className="avatar-options">
                  {avatarOptions.map(avatar => (
                    <label key={avatar} className="avatar-option">
                      <input
                        type="radio"
                        name="avatar"
                        value={avatar}
                        checked={formData.avatar === avatar}
                        onChange={handleInputChange}
                      />
                      <span className="avatar-preview">{avatar}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Skills</label>
                <div className="skills-input-group">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a skill and press Enter"
                    className="skill-input"
                  />
                  <button 
                    type="button"
                    onClick={handleAddSkill}
                    className="btn-secondary"
                  >
                    Add
                  </button>
                </div>
                <div className="skills-list">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                      <button 
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="remove-skill"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                  disabled={!formData.name || !formData.role || !formData.email}
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMemberForm;