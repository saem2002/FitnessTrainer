import axios from 'axios';
import clients from '../clients.json'

export const url = 'https://backendapi-io39.onrender.com';


export const getAllClients = async () => {
    try {

        let response = await axios.get(`${url}/clients`);



        return response.data;
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}
export const getAllAppointments = async () => {
    try {

        let response = await axios.get(`${url}/clients`);

        const farr = [];
        for (let index = 0; index < response.data.length; index++) {
            let element = response.data[index].Appointments;

            if (element.length > 0) {
              
                for (let index2 = 0; index2 < element.length; index2++) {

                    const element2 = element[index2];
                  
                    const arr ={ "userid":response.data[index].id,"FirstName": response.data[index].FirstName, "LastName": response.data[index].LastName,"id":element2.id,"date":element2.date,"time":element2.time };
                    farr.push(arr);
                }
            }


        }
   

        return farr;
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}
export const updateItems = async (data) => {
    try {
        console.log(data)
        const getData = await axios.get(`${url}/clients/${data.id}`);

        getData.data.FirstName = data.FirstName;
        getData.data.LastName = data.LastName;
        getData.data.Location = data.Location;

        let response = await axios.patch(`${url}/clients/${data.id}`, getData.data).catch(error => { console.log(error) });

        return response;
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}

export const addData = async (id, date, time) => {
    try {
        const getData = await axios.get(`${url}/clients/${id}`);


        const arr = getData.data.Appointments;
        arr.push({ "id": arr.length + 1, "date": date, "time": time })

        getData.data.Appointments = arr;
        let response = await axios.patch(`${url}/clients/${id}`, getData.data).catch(error => { console.log(error) });




        return response;
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}


export const deleteData = async (id, id_app) => {
    try {
        const getData = await axios.get(`${url}/clients/${id}`);


        const arr = getData.data.Appointments;
        let indexForRemoval = -1;

        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.id === id_app) {
                indexForRemoval = index;
                break;
            }

        }

        arr.splice(indexForRemoval, 1);

        getData.data.Appointments = arr;
        let response = await axios.patch(`${url}/clients/${id}`, getData.data).catch(error => { console.log(error) });




        return response;
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}
export const EditData = async (id, id_app,date,time) => {
    try {
        const getData = await axios.get(`${url}/clients/${id}`);


        const arr = getData.data.Appointments;
        console.log(date)
        console.log(time)
        console.log(id_app)
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.id === id_app) {
                arr[index].date = date;
                arr[index].time=time;
                break;
            }

        }

       console.log(arr)

        getData.data.Appointments = arr;
        let response = await axios.patch(`${url}/clients/${id}`, getData.data).catch(error => { console.log(error) });




        return response;
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}

