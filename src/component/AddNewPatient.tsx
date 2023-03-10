import React, { useState,useRef } from 'react';
import { IPersonalInfo, IAddress, IBehavior, IRecordDetails,IToFire } from './alltype';
import Navbar from './Navbar';
import { startPersonalInfo,startAddress,startBehavior,startRecordDetails,startToFire } from './startdata';
import './css/AddNewPatient.css'
import { async } from '@firebase/util';
import { addDataTool } from '../lib/addDataTool';
import { storage } from '../lib/config';
import { uploadBytes,ref,getDownloadURL  } from 'firebase/storage';

function AddNewPatient() {

    const [toFire,setToFire] = useState<IToFire>(startToFire)
       
    const [personalInfo,setPersonalInfo] = useState<IPersonalInfo>(startPersonalInfo)
    const [civilRegistrationAddress,setCivilRegistrationAddress] = useState<IAddress>(startAddress)
    const [currentAddress,setCurrentAddress] = useState<IAddress>(startAddress)
    const [behavior,setBehavior] = useState<IBehavior>(startBehavior)
    const [recordDetails,setRecordDetails] = useState<IRecordDetails>(startRecordDetails)

    const [filePic, setFilePic] = useState<File | undefined>();
    const inputRef = useRef<HTMLInputElement>(null);

    const resetFileInput = () => {
        // 👇️ reset input value
        if (inputRef.current) {
            inputRef.current.value = '';
          }
      };

    //ใช้ refesh แทน
    function setStartForm(){
        setPersonalInfo(startPersonalInfo)
        setCivilRegistrationAddress(startAddress)
        setCurrentAddress(startAddress)
        setBehavior(startBehavior)
        setRecordDetails(startRecordDetails)
        setIs1Done(false)
        setIs2Done(false)
        setIs3Done(false)
        setIs4Done(false)
        setIs5Done(false)
        setChecked(true)
        resetFileInput()
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          setFilePic(file);
        }
      }
   
    const [checked, setChecked] = useState<boolean>(true); 
    function handleCheckBox(){
        setChecked(!checked)
        if(checked){setCurrentAddress(civilRegistrationAddress)}
        else{setCurrentAddress(startAddress)}
    }
      
    const [is1Done,setIs1Done] = useState(false)
    const [is2Done,setIs2Done] = useState(false)
    const [is3Done,setIs3Done] = useState(false)
    const [is4Done,setIs4Done] = useState(false)
    const [is5Done,setIs5Done] = useState(false)
    const refresh = () => window.location.reload()

    function subPersonalInfo(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setIs1Done(true)
        setToFire({...toFire,personalInfo:personalInfo})     
    }
    function subCivilRegistrationAddress(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setIs2Done(true)
        setToFire({...toFire,civilRegistrationAddress:civilRegistrationAddress})
    }
    function subCurrentAddresss(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setIs3Done(true)
        setToFire({...toFire,currentAddress:currentAddress})
    }
    function subBehavior(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setIs4Done(true)
        setToFire({...toFire,behavior:behavior})
    }
    function subRecordDetails(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setIs5Done(true)
        const now = new Date();
        setRecordDetails({...recordDetails,DateAdded:now,DateOfLastRevision:now});
        setToFire({...toFire,recordDetails:recordDetails});
    }
    
    async function upLoadPic() {
        if (!filePic) {
          return '';
        }
        const imgref = ref(storage, `patientPic/${personalInfo.IDCard}`);
        const snapshot = await uploadBytes(imgref, filePic);
        const url = await getDownloadURL(snapshot.ref);
        return url;
      }

    async function handleAddDoc() {
        const allgood = is1Done && is2Done && is3Done && is4Done && is5Done;
        
        if (!allgood) {
            return alert('ตรวจอีกครั้ง');
        }

        try {
            const url = await upLoadPic(); // อัพโหลดรูปไปใน storage
            const updatedPersonalInfo = {
            ...toFire.personalInfo,
            PersonPicture: url,
            };
            const updatedToFire = {
            ...toFire,
            personalInfo: updatedPersonalInfo,
            };
            await addDataTool('/highvalueman', updatedToFire);
            alert('เพิ่มข้อมูลเรียบร้อยแล้ว');
            
            const toTop = () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            };
            refresh()
        } catch (err) {
            console.error(err);
            alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
        }
    }

    function Change1(){
        setIs1Done(false)
    }
    function Change2(){
        setIs2Done(false)
    }
    function Change3(){
        setIs3Done(false)
    }
    function Change4(){
        setIs4Done(false)
    }
    function Change5(){
        setIs5Done(false)
    }
    
    


  return (
    <div>
        <Navbar/>
        <div className="container">
            <div className="form-section">
                <h2>Personal Information</h2>
                <form onSubmit={subPersonalInfo} onChange={Change1}>
                    <div className="form-grid">
                        <div className="form1">
                            <label>ID Card:</label>
                            <input type="text" value={personalInfo.IDCard} onChange={(e) => setPersonalInfo({...personalInfo, IDCard: (e.target.value)})} required />
                        </div>

                        <div className="form1">
                            <label>Name Title:</label>
                            <select defaultValue="" onChange={(e) => setPersonalInfo({...personalInfo,NameTitle: e.target.value})}>
                                <option value="" disabled>Select your option</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Ms.">Ms.</option>
                            </select>
                        </div>

                        <div className="form1">
                            <label>First Name:</label>
                            <input type="text" value={personalInfo.FirstName} onChange={(e) => setPersonalInfo({...personalInfo,FirstName: e.target.value})} required />
                        </div>

                        <div className="form1">
                            <label>Last Name:</label>
                            <input type="text" value={personalInfo.LastName} onChange={(e) => setPersonalInfo({...personalInfo,LastName: e.target.value})} required />
                        </div>

                        <div className="form1">
                            <label>Nick Name:</label>
                            <input type="text" value={personalInfo.NickName} onChange={(e) => setPersonalInfo({...personalInfo,NickName: e.target.value})}/>
                        </div>

                        <div className="form1">
                            <label>Date of Birth:</label>
                            <input type="date" value={personalInfo.DateOfBirth.toISOString().slice(0, 10)} onChange={(e) => setPersonalInfo({...personalInfo, DateOfBirth: new Date(e.target.value)})} />
                        </div>

                        <div className="form1">
                            <label>Gender:</label>
                            <select defaultValue=""  onChange={(e) => setPersonalInfo({...personalInfo, Gender: e.target.value})}>
                                <option value="" disabled>Select your option</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form1">
                            <label>Group of People:</label>
                            <select  defaultValue=""  onChange={(e) => setPersonalInfo({...personalInfo, GroupOfPeople: e.target.value})}>
                                <option value="" disabled>Select your option</option>
                                <option value="Normal Person">Normal Person</option>
                                <option value="Soldier">Soldier</option>
                                <option value="Monk">Monk</option>
                                <option value="Ex-Convict">Ex-Convict</option>
                            </select>
                        </div>

                        <div className="form1">
                            <label>Nationality:</label>
                            <input type="text" value={personalInfo.Nationality} onChange={(e) => setPersonalInfo({...personalInfo,Nationality: e.target.value})}/>
                        </div>

                        <div className="form1">
                            <label>Ethnicity:</label>
                            <input type="text" value={personalInfo.Ethnicity} onChange={(e) => setPersonalInfo({...personalInfo,Ethnicity: e.target.value})}/>
                        </div>

                        <div className="form1">
                            <label>Person Picture:</label>
                            <input type="file" ref={inputRef} onChange={handleFileChange}/>
                        </div>
                    </div>
                    <div className="button-container">
                        {!is1Done ? (
                            <button type='submit'>Done</button>
                        ) : (
                            <p>Task completed.</p>
                        )}
                    </div>
                </form>
            </div>
            <div className="form-section">
                <h2>Address according to civil registration</h2>
                <form onSubmit={subCivilRegistrationAddress} onChange={Change2}>
                    <div className='form-grid'>
                        <div className="form1">
                            <label>Province:</label>
                            <input type="text" value={civilRegistrationAddress.Province} onChange={(e)=>{setCivilRegistrationAddress({...civilRegistrationAddress,Province:e.target.value})}}/>
                        </div>
                        <div className="form1">
                            <label>District:</label>
                            <input type="text" value={civilRegistrationAddress.District} onChange={(e) => {setCivilRegistrationAddress({...civilRegistrationAddress, District: e.target.value})}}/>
                        </div>
                        <div className="form1">
                            <label>Subdistrict:</label>
                            <input type="text" value={civilRegistrationAddress.Subdistrict} onChange={(e) => {setCivilRegistrationAddress({...civilRegistrationAddress, Subdistrict: e.target.value})}}/>
                        </div>
                        <div className="form1">
                            <label>Village:</label>
                            <input type="text" value={civilRegistrationAddress.Village} onChange={(e) => {setCivilRegistrationAddress({...civilRegistrationAddress, Village: e.target.value})}}/>
                        </div>
                        <div className="form1">
                            <label>House Number:</label>
                            <input type="text" value={civilRegistrationAddress.HouseNumber} onChange={(e) => {setCivilRegistrationAddress({...civilRegistrationAddress, HouseNumber: e.target.value})}}/>
                        </div>
                        <div className="form1">
                            <label>Road:</label>
                            <input type="text" value={civilRegistrationAddress.Road} onChange={(e) => {setCivilRegistrationAddress({...civilRegistrationAddress, Road: e.target.value})}}/>
                        </div>
                        <div className="form1">
                            <label>Alley:</label>
                            <input type="text" value={civilRegistrationAddress.Alley} onChange={(e) => {setCivilRegistrationAddress({...civilRegistrationAddress, Alley: e.target.value})}}/>
                        </div>
                    </div>
                    <div className="button-container">
                        {!is2Done ? (
                                <button type='submit'>Done</button>
                        ) : (
                            <p>Task completed.</p>
                        )}
                    </div>
                </form>
            </div>
            <div className="form-section">
                <h2>Current Address</h2>
                <div><label>same as address according to civil registration</label><input onChange={handleCheckBox} type="checkbox"/></div>
                <form onSubmit={subCurrentAddresss} onChange={Change3}>
                    <div className="form-grid">
                        <div className="form1">
                            <label>Province:</label>
                            <input type="text" value={currentAddress.Province} onChange={(e) => setCurrentAddress({...currentAddress, Province: e.target.value})} />
                        </div>
                        <div className="form1">
                            <label>District:</label>
                            <input type="text" value={currentAddress.District} onChange={(e) => setCurrentAddress({...currentAddress, District: e.target.value})} />
                        </div>
                        <div className="form1">
                            <label>Subdistrict:</label>
                            <input type="text" value={currentAddress.Subdistrict} onChange={(e) => setCurrentAddress({...currentAddress, Subdistrict: e.target.value})} />
                        </div>
                        <div className="form1">
                            <label>Village:</label>
                            <input type="text" value={currentAddress.Village} onChange={(e) => setCurrentAddress({...currentAddress, Village: e.target.value})} />
                        </div>
                        <div className="form1">
                            <label>House Number:</label>
                            <input type="text" value={currentAddress.HouseNumber} onChange={(e) => setCurrentAddress({...currentAddress, HouseNumber: e.target.value})} />
                        </div>
                        <div className="form1">
                            <label>Road:</label>
                            <input type="text" value={currentAddress.Road} onChange={(e) => setCurrentAddress({...currentAddress, Road: e.target.value})} />
                        </div>
                        <div className="form1">
                            <label>Alley:</label>
                            <input type="text" value={currentAddress.Alley} onChange={(e) => setCurrentAddress({...currentAddress, Alley: e.target.value})} />
                        </div>
                    </div>
                    <div className="button-container">
                        {!is3Done ? (
                            <button type='submit'>Done</button>
                        ) : (
                            <p>Task completed.</p>
                        )}
                    </div>
                </form>
            </div>
            <div className="form-section">
                <h2>Behavior/Guilt Information</h2>
                <form onSubmit={subBehavior} onChange={Change4}>
                    <div className="form-grid">
                        <div className="form1">
                            <label>Offense Type:</label>
                            <input type="text" value={behavior.OffenseType} onChange={(e) => setBehavior({...behavior,OffenseType: e.target.value})}/>
                        </div>
                        <div className="form1">
                            <label>Date of Offense:</label>
                            <input type="date" value={behavior.DateOfOffense?.toISOString().slice(0, 10)} onChange={(e) => setBehavior({...behavior, DateOfOffense: new Date(e.target.value)})}/>
                        </div>
                        <div className="form1">
                            <label>Action:</label>
                            <input type="text" value={behavior.Action} onChange={(e) => setBehavior({...behavior, Action: e.target.value})}/>
                        </div>
                    </div>
                    <div className="button-container">
                        {!is4Done ? (
                            <button type='submit'>Done</button>
                        ) : (
                            <p>Task completed.</p>
                        )}
                    </div>
                </form>
            </div>
            <div className="form-section">
                <h2>Record Details</h2>
                <form onSubmit={subRecordDetails} onChange={Change5}>
                    <div className='form-grid'>
                        <div className="form1">
                            <label>Source of Information:</label>
                            <input type="text" value={recordDetails.SourceOfInformation} onChange={(e) => setRecordDetails({...recordDetails, SourceOfInformation: e.target.value})}/>
                        </div>
                        <div className="form1">
                            <label>Confirmed Information:</label>
                            <input type="checkbox" checked={recordDetails.ConfirmInformation} onChange={(e) => setRecordDetails({...recordDetails, ConfirmInformation: e.target.checked})}/>
                        </div>
                        <div className="form1">
                            <label>Status:</label>
                            <input type="text" value={recordDetails.Status} onChange={(e) => setRecordDetails({...recordDetails, Status: e.target.value})}/>
                        </div>                        
                    </div>
                    <div className="button-container">
                        {!is5Done ? (
                            <button type='submit'>Done</button>
                        ) : (
                            <p>Task completed.</p>
                        )}
                    </div>
                </form>
            </div>
            <div className='addDoc-button'>
                <button onClick={handleAddDoc}>AddDoc</button>
            </div>
        </div>
    </div>
  )
}

export default AddNewPatient