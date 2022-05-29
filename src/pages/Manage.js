import { useState, useEffect } from 'react';
import '../App.js';
import api from '../services/api.js';

export default function Manage({ history }) {
    const [receivers, setReceivers] = useState([]);
    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        coverage: '',
    })

    const handleFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...formData};
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const latitude = parseFloat(formData.latitude);
        const longitude = parseFloat(formData.longitude);
        const coverage = parseFloat(formData.coverage);

        const response = await api.post('/receiver', { latitude, longitude, coverage});
        const newReceiver = response.data;
        const newReceivers = [ ...receivers, newReceiver]
        setReceivers(newReceivers);
    }

    async function markers() {
        const result = await api.get('/receiver');
        setReceivers(result.data);
    }

    async function handleDelete(receiver_id) {

        await api.delete('/receiver', { 
            headers: { receiver_id }
        });

        markers();
    }

    function onKeyPressEventDecimal(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (!(new RegExp("^[+-]?[0-9]{0,900}(?:\\.[0-9]{0,900})?$").test(keyValue)))
          event.preventDefault();
        return;
      }

    useEffect(() => {
        markers();
      }, []);

    return (
        <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Coverage Radius (Km)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {receivers.map((receiver) => (
                    <tr>
                        <td>{receiver._id}</td>
                        <td>{receiver.latitude}</td>
                        <td>{receiver.longitude}</td>
                        <td>{receiver.coverage}</td>
                        <td>
                            <button onClick={()=> handleDelete(receiver._id)}>Delete</button>
                        </td>
                    </tr>
                  
                ))}
              </tbody>
            </table>
    
            <div className='add-receiver'>
                <h2>Add Receiver</h2>
                <form onSubmit={handleFormSubmit}>
                    <input
                    type="text"
                    name="latitude"
                    required="required"
                    placeholder="Enter latitude.."
                    onChange={handleFormChange}
                    onKeyPress={onKeyPressEventDecimal}
                    />
                    <input
                    type="text"
                    name="longitude"
                    required="required"
                    placeholder="Enter longitude..."
                    onKeyPress={onKeyPressEventDecimal}
                    onChange={handleFormChange}
                    />
                    <input
                    type="Number"
                    min="1"
                    max="10"
                    name="coverage"
                    required="required"
                    placeholder="Enter radius coverage in Km..."
                    onChange={handleFormChange}
                    />
                    <button id='btn-add' type="submit">Add</button>
                </form>

            </div>
            
          
        </div>

        
    );


}