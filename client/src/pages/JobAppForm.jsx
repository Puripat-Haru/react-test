import { useState } from 'react';

export default function JobAppForm() {
    const [formData, setFormData] = useState({
        applyDate: new Date().toISOString().split("T")[0],
        firstName: "",
        lastName: "",
        desiredPosition: "",
        expectedSalary: "",
        houseNumber: "",
        moo: "",
        street: "",
        subDistrict: "",
        district: "",
        province: "",
        postalCode: "",
        phone: "",
        email: "",
        birthDate: "",
        age: "",
        ethnicity: "",
        nationality: "",
        religion: "",
        idCardCopy: false,
        houseRegistration: false,
        certificateCopy: false,
        bankBookCopy: false,
        otherDocuments: false,
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked :
                // type === 'radio' ? checked :
                type === 'number' ? (value ? parseInt(value, 10) : 0) : value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedBirthDate = formData.birthDate ? new Date(formData.birthDate).toISOString().split("T")[0] : "";

        // สร้าง FormData
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        // ถ้ามีการอัปโหลดรูปภาพ ให้เพิ่มไฟล์ลงไปใน FormData
        if (image) {
            formDataToSend.append('image', image);
        }

        const requestData = {
            ...formData,
            birthDate: formattedBirthDate
        };

        console.log("Data before sending:", requestData); // Debug data
        console.log("Type of expectedSalary:", typeof formData.expectedSalary); // ตรวจสอบ type

        try {
            const response = await fetch("http://localhost:5000/api/job-applications", {
                method: "POST",
                body: formDataToSend, // ส่ง FormData
            });

            const result = await response.json();
            console.log("Server Response:", result); // Debug Response

            if (response.ok) {
                alert("สมัครงานสำเร็จ!");
            } else {
                alert(result.message || "เกิดข้อผิดพลาดในการสมัคร");
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
        }
    };


    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">แบบฟอร์มสมัครงาน</h2>

            {/* วันที่สมัคร */}
            <div className="mb-4">
                <label className="block text-gray-600">วันที่สมัคร</label>
                <input
                    type="date"
                    name="applyDate"
                    value={formData.applyDate}
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 bg-gray-100"
                    disabled
                />
            </div>

            {/* รูปภาพ */}
            <div className="mb-4">
                <label className="block text-gray-600 font-medium">อัปโหลดรูปภาพ</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
                {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md border" />
                )}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
                {/* ชื่อ - นามสกุล */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600">ชื่อจริง</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-gray-600">นามสกุล</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                    </div>
                </div>

                {/* ตำแหน่ง - เงินเดือน */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600">ตำแหน่งที่ต้องการ</label>
                        <input type="text" name="desiredPosition" value={formData.desiredPosition} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-gray-600">เงินเดือนที่คาดหวัง</label>
                        <input type="number" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                    </div>
                </div>

                {/* เช็คบ็อกซ์สำเนาเอกสาร */}
                <div className="grid grid-cols-1 gap-4">
                    {["idCardCopy", "houseRegistration", "certificateCopy", "bankBookCopy", "otherDocuments"].map((field) => (
                        <label key={field} className="flex items-center space-x-2 text-gray-600">
                            <input type="checkbox" name={field} checked={formData[field]} onChange={handleChange} className="h-4 w-4" />
                            <span>{field === "idCardCopy" ? "สำเนาบัตรประชาชน" : field === "houseRegistration" ? "สำเนาทะเบียนบ้าน" : field === "certificateCopy" ? "สำเนาประกาศนียบัตร" : field === "bankBookCopy" ? "สำเนาหน้าสมุดธนาคาร" : "อื่นๆ (ถ้ามี)"}</span>
                        </label>
                    ))}
                </div>

                {/* ที่อยู่ */}
                <div className="grid grid-cols-2 gap-4">
                    {["houseNumber", "moo", "street", "subDistrict", "district", "province", "postalCode"].map((field) =>
                        <div key={field}>
                            <label className="block text-gray-600">
                                <span>{field === "houseNumber" ? "บ้านเลขที่" : field === "moo" ? "หมู่ที่" : field === "street" ? "ถนน" : field === "subDistrict" ? "ตำบล/แขวง" : field === "district" ? "อำเภอ/เขต" : field === "province" ? "จังหวัด" : "รหัสไปรษณีย์"}</span>
                                <input type="text" name={field} value={formData[field]} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                            </label>
                        </div>
                    )}
                </div>

                {/* เบอร์โทร - อีเมล */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600">เบอร์โทรศัพท์</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-gray-600">อีเมล</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                    </div>
                </div>

                {/* ที่พักอาศัย */}
                <div className="grid grid-cols-4 gap-4 text-gray-600">
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="livingStatus" value="อาศัยกับครอบครัว" checked={formData.livingStatus === "อาศัยกับครอบครัว"} onChange={handleChange} className="h-4 w-4" />
                        อาศัยกับครอบครัว
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="livingStatus" value="บ้านตัวเอง" checked={formData.livingStatus === "บ้านตัวเอง"} onChange={handleChange} className="h-4 w-4" />
                        บ้านตัวเอง
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="livingStatus" value="บ้านเช่า" checked={formData.livingStatus === "บ้านเช่า"} onChange={handleChange} className="h-4 w-4" />
                        บ้านเช่า
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="livingStatus" value="คอนโด" checked={formData.livingStatus === "คอนโด"} onChange={handleChange} className="h-4 w-4" />
                        คอนโด
                    </label>

                </div>

                {/* วันเกิด - อายุ */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600">วันเกิด</label>
                        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full p-2 bprder rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-gray-600">อายุ</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                    </div>
                </div>

                {/* สัญชาติ - เชื้อชาติ - ศาสนา */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-600">สัญชาติ</label>
                        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-gray-600">เชื้อชาติ</label>
                        <input type="text" name="ethnicity" value={formData.ethnicity} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-gray-600">ศาสนา</label>
                        <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                    </div>
                </div>

                {/* ภาวะทางการทหาร */}
                <div>
                    <label className="block text-gray-600">ภาวะทางการทหาร</label>
                    <div className="grid grid-cols-3 gap-4 text-gray-600">
                        <label>
                            <input type="radio" name="militaryStatus" value="ได้รับการยกเว้น" checked={formData.militaryStatus === "ได้รับการยกเว้น"} onChange={handleChange} className="h-4 w-4 space-x-2" />
                            ได้รับการยกเว้น
                        </label>
                        <label>
                            <input type="radio" name="militaryStatus" value="ปลดเป็นทหารกองหนุน" checked={formData.militaryStatus === "ปลดเป็นทหารกองหนุน"} onChange={handleChange} className="h-4 w-4 space-x-2" />
                            ปลดเป็นทหารกองหนุน
                        </label>
                        <label>
                            <input type="radio" name="militaryStatus" value="ยังไม่ได้รับการเกณฑ์" checked={formData.militaryStatus === "ยังไม่ได้รับการเกณฑ์"} onChange={handleChange} className="h-4 w-4 space-x-2" />
                            ยังไม่ได้รับการเกณฑ์
                        </label>
                    </div>
                </div>

                {/* สถานภาพ */}
                <div>
                    <label className="block text-gray-600">สถานภาพ</label>
                    <div className="grid grid-cols-3 gap-4 text-gray-600">
                        <label>
                            <input type="radio" name="maritalStatus" value="โสด" checked={formData.maritalStatus === "โสด"} onChange={handleChange} className="h-4 w-4 space-x-2" />
                            โสด
                        </label>
                        <label>
                            <input type="radio" name="maritalStatus" value="สมรส" checked={formData.maritalStatus === "สมรส"} onChange={handleChange} className="h-4 w-4 space-x-2" />
                            สมรส
                        </label>
                        <label>
                            <input type="radio" name="maritalStatus" value="หย่าร้าง" checked={formData.maritalStatus === "หย่าร้าง"} onChange={handleChange} className="h-4 w-4 space-x-2" />
                            หย่าร้าง
                        </label>

                    </div>
                </div>


                {/* ปุ่มส่ง */}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
                    ส่งใบสมัคร
                </button>
            </form>
        </div>
    )

}