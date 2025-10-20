import React, { useState } from 'react';
import { Trash2, Mail, Calendar } from 'lucide-react';

const MemberCard = ({ member, onDeleteMember, onSendMessage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    if (confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
      onDeleteMember(member.id);
    }
  };

  const handleSendMessage = () => {
    onSendMessage(member);
  };

  return (
    <div className="member-card">
      <div className="member-header">
        <div className="member-avatar">{member.avatar}</div>
        <div className="member-basic-info">
          <h3 className="member-name">{member.name}</h3>
          <p className="member-role">{member.role}</p>
          <span className={`department-badge department-${member.department.toLowerCase()}`}>
            {member.department}
          </span>
        </div>
      </div>

      <div className="member-contact">
        <Mail size={16} />
        <span className="member-email">{member.email}</span>
      </div>

      <div className="member-meta">
        <Calendar size={16} />
        <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
      </div>

      {isExpanded && (
        <div className="member-details">
          <div className="skills-section">
            <h4>Skills</h4>
            <div className="skills-list">
              {member.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="member-actions">
        <button 
          className="btn-expand"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
        
        <div className="action-buttons">
          <button 
            className="btn-icon btn-message"
            onClick={handleSendMessage}
            title="Send Message"
            aria-label={`Send message to ${member.name}`}
          >
            <Mail size={18} />
            <span className="mobile-only btn-label">Message</span>
          </button>
          
          <button 
            className="btn-icon btn-delete"
            onClick={handleDelete}
            title="Remove Member"
            aria-label={`Remove ${member.name} from team`}
          >
            <Trash2 size={18} />
            <span className="mobile-only btn-label">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;