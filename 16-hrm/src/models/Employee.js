import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    hireDate: { type: Date, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
    salary: { type: Number, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
