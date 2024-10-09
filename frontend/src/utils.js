import axios from "axios"
import { toast } from "sonner"

export const postRequest = async ({ url, formData, state }) => {
  try {
    if (state) {
      state(true)
    }

    const { data } = await axios.post(`/api${url}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })

    return {
      err: false,
      data
    }
  } catch (error) {
    const totalErrors = [];
    if (error.response && (error.response.data.err || error.response.data.message)) {
      const errorObject = error.response.data.err || error.response.data.message;
      if (typeof errorObject === "object" && !Array.isArray(errorObject)) {
        //if the error object is NOT an array but a normal object
        Object.keys(errorObject).forEach(key => {
          //a single error detail
          const errDetails = errorObject[key];
          if (Array.isArray(errDetails)) {
            //the single error detail could be another array of strings so we loop through it
            errDetails.forEach(err => {
              toast.error(err)
              totalErrors.push(err);
            })
          } else {
            //single error is simply a string in this instance
            totalErrors.push(errDetails);
            toast.error(errDetails)
          }
        })
      } else if (typeof errorObject === "string") {
        //If the error object is not an array, it's a single error message
        console.log(errorObject)
        toast.error(errorObject)
        totalErrors.push(errorObject)
      } else if (typeof errorObject === "object" && Array.isArray(errorObject)) {
        //if the error object is an array, it's an array of errors
        totalErrors.push(...errorObject)
      }
    } else {
      totalErrors.push("Unable to connect to server, please try again")
    }
    return {
      err: totalErrors,
      data: false
    }
  } finally {
    if (state) {
      state(false)
    }
  }
}

export const patchRequest = async ({ url, formData, state }) => {
  try {
    if (state) {
      state(true)
    }
    if (formData) {
      //check if formData is of FormData
      if ("constructor" in formData && typeof formData["constructor"] == "function") {
        formData.append("_method", "PATCH");
      } else {
        formData["_method"] = "PATCH";
      }
    } else {
      formData = {
        "_method": "PATCH"
      }
    }
    const { data } = await axios.post(`/api${url}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })

    return {
      err: false,
      data
    }
  } catch (error) {
    const totalErrors = [];
    if (error.response && (error.response.data.err || error.response.data.message)) {
      const errorObject = error.response.data.err || error.response.data.message;
      if (typeof errorObject === "object" && !Array.isArray(errorObject)) {
        //if the error object is NOT an array but a normal object
        Object.keys(errorObject).forEach(key => {
          //a single error detail
          const errDetails = errorObject[key];
          if (Array.isArray(errDetails)) {
            //the single error detail could be another array of strings so we loop through it
            errDetails.forEach(err => {
              toast.error(err)
              totalErrors.push(err);
            })
          } else {
            //single error is simply a string in this instance
            totalErrors.push(errDetails);
            toast.error(errDetails)
          }
        })
      } else if (typeof errorObject === "string") {
        //If the error object is not an array, it's a single error message
        console.log(errorObject)
        toast.error(errorObject)
        totalErrors.push(errorObject)
      } else if (typeof errorObject === "object" && Array.isArray(errorObject)) {
        //if the error object is an array, it's an array of errors
        totalErrors.push(...errorObject)
      }
    } else {
      totalErrors.push("Unable to connect to server, please try again")
    }
    return {
      err: totalErrors,
      data: false
    }
  } finally {
    if (state) {
      state(false)
    }
  }
}

export const putRequest = async ({ url, formData, state }) => {
  try {
    if (state) {
      state(true)
    }
    if (formData) {
      //check if formData is of FormData
      if ("constructor" in formData && typeof formData["constructor"] == "function") {
        formData.append("_method", "PATCH");
      } else {
        formData["_method"] = "PATCH";
      }
    } else {
      formData = {
        "_method": "PATCH"
      }
    }
    const { data } = await axios.post(`/api${url}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })

    return {
      err: false,
      data
    }
  } catch (error) {
    const totalErrors = [];
    if (error.response && (error.response.data.err || error.response.data.message)) {
      const errorObject = error.response.data.err || error.response.data.message;
      if (typeof errorObject === "object" && !Array.isArray(errorObject)) {
        //if the error object is NOT an array but a normal object
        Object.keys(errorObject).forEach(key => {
          //a single error detail
          const errDetails = errorObject[key];
          if (Array.isArray(errDetails)) {
            //the single error detail could be another array of strings so we loop through it
            errDetails.forEach(err => {
              toast.error(err)
              totalErrors.push(err);
            })
          } else {
            //single error is simply a string in this instance
            totalErrors.push(errDetails);
            toast.error(errDetails)
          }
        })
      } else if (typeof errorObject === "string") {
        //If the error object is not an array, it's a single error message
        console.log(errorObject)
        toast.error(errorObject)
        totalErrors.push(errorObject)
      } else if (typeof errorObject === "object" && Array.isArray(errorObject)) {
        //if the error object is an array, it's an array of errors
        totalErrors.push(...errorObject)
      }
    } else {
      totalErrors.push("Unable to connect to server, please try again")
    }
    return {
      err: totalErrors,
      data: false
    }
  } finally {
    if (state) {
      state(false)
    }
  }
}

export const getRequest = async ({ url, state }) => {
  try {
    if (state) {
      state(true)
    }
    const { data } = await axios.get(`/api${url}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })

    return {
      err: false,
      data
    }
  } catch (error) {
    const totalErrors = [];
    if (error.response && (error.response.data.err || error.response.data.message)) {
      const errorObject = error.response.data.err || error.response.data.message;
      if (typeof errorObject === "object" && !Array.isArray(errorObject)) {
        //if the error object is NOT an array but a normal object
        Object.keys(errorObject).forEach(key => {
          //a single error detail
          const errDetails = errorObject[key];
          if (Array.isArray(errDetails)) {
            //the single error detail could be another array of strings so we loop through it
            errDetails.forEach(err => {
              toast.error(err)
              totalErrors.push(err);
            })
          } else {
            //single error is simply a string in this instance
            totalErrors.push(errDetails);
            toast.error(errDetails)
          }
        })
      } else if (typeof errorObject === "string") {
        //If the error object is not an array, it's a single error message
        console.log(errorObject)
        toast.error(errorObject)
        totalErrors.push(errorObject)
      } else if (typeof errorObject === "object" && Array.isArray(errorObject)) {
        //if the error object is an array, it's an array of errors
        totalErrors.push(...errorObject)
      }
    } else {
      totalErrors.push("Unable to connect to server, please try again")
    }
    return {
      err: totalErrors,
      data: false
    }
  } finally {
    if (state) {
      state(false)
    }
  }
}

export const deleteRequest = async ({ url, state }) => {
  try {
    if (state) {
      state(true)
    }

    const { data } = await axios.delete(`/api${url}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "_method": "DELETE"
      }
    })

    return {
      err: false,
      data
    }
  } catch (error) {
    const totalErrors = [];
    if (error.response && (error.response.data.err || error.response.data.message)) {
      const errorObject = error.response.data.err || error.response.data.message;
      if (typeof errorObject === "object" && !Array.isArray(errorObject)) {
        //if the error object is NOT an array but a normal object
        Object.keys(errorObject).forEach(key => {
          //a single error detail
          const errDetails = errorObject[key];
          if (Array.isArray(errDetails)) {
            //the single error detail could be another array of strings so we loop through it
            errDetails.forEach(err => {
              toast.error(err)
              totalErrors.push(err);
            })
          } else {
            //single error is simply a string in this instance
            totalErrors.push(errDetails);
            toast.error(errDetails)
          }
        })
      } else if (typeof errorObject === "string") {
        //If the error object is not an array, it's a single error message
        console.log(errorObject)
        toast.error(errorObject)
        totalErrors.push(errorObject)
      } else if (typeof errorObject === "object" && Array.isArray(errorObject)) {
        //if the error object is an array, it's an array of errors
        totalErrors.push(...errorObject)
      }
    } else {
      totalErrors.push("Unable to connect to server, please try again")
    }
    return {
      err: totalErrors,
      data: false
    }
  } finally {
    if (state) {
      state(false)
    }
  }
}