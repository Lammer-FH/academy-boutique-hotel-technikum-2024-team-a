import {defineStore} from 'pinia'
import axios from 'axios'

const apiUrl = "https://boutique-hotel.helmuth-lammer.at/api/v1/";

export const useRoomsStore = defineStore('rooms', {
    state: () => ({
        dateRange: {
            startDate: null,
            endDate: null
        },
        bookingData:  {
            firstname: '',
            lastname: '',
            birthdate: null,
            email: '',
        },
        apiData: null,
    }),

    actions: {

        async fetchRoomInfo() {
            try {
                const response = await axios.get(`${apiUrl}rooms`);
                this.rooms = response.data;
            } catch (error) {
                console.log("Error fetching room info:", error);
            }
        },

        async fetchRoomAvailability(roomId) {
            try{
            const response = await axios.get(`${apiUrl}room/${roomId}/from/${this.dateRange.startDate}/to/${this.dateRange.endDate}`)
                .then(response => {
                    this.apiData = response.data.available
                })
            }catch (error){
                console.error("Error fetching data:", error);
            }
        },
        setDateRange(startDate, endDate) {
            this.dateRange.startDate = startDate;
            this.dateRange.endDate = endDate;
        },
        getDateRange() {
            return this.dateRange;
        },
        setBookingData(bookingData){
            this.bookingData = bookingData;
        }
    }
})