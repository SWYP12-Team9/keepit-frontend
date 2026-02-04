import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob29uIiwidXNlcklkIjoxLCJyb2xlIjoiUk9MRV9VU0VSIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc3MDE3MjE3MywiZXhwIjoxNzcyNTkxMzczfQ.KPJXj7G1ypC1mJjATkEusaSaxs_60uxrq45UA4oBk8c`,
  },
})
