import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLogs } from "../../actions/logActions";
import M from "materialize-css/dist/js/materialize.min.js";

const AddLogModal = ({ addLogs }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const onSubmit = () => {
    if (message === "" && tech === "") {
      M.toast({ html: "Please enter a message and technician" });
    } else if (message === "") {
      M.toast({ html: "Please enter a message" });
    } else if (tech === "") {
      M.toast({ html: "Please choose a technician" });
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date()
      };

      addLogs(newLog);

      M.toast({ html: `Log added by ${tech}` });
      //Clear Fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <input
            type='text'
            name='message'
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <label htmlFor='message' className='active'>
            Log Message
          </label>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={e => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Technician
              </option>
              <option value='Thierry Gribeauval'>Thierry Gribeauval</option>
              <option value='Satoshi Nakamoto'>Satoshi Nakamoto</option>
              <option value='Vitalik Buterin'>Vitalik Buterin</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue waves-light btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddLogModal.propTypes = {
  addLogs: PropTypes.func.isRequired
};

const modalStyle = {
  width: "75%",
  height: "75%"
};

export default connect(null, { addLogs })(AddLogModal);
