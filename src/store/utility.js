export const updateObject = (oldObject, updatedParams) => {
    return {
        ...oldObject,
        ...updatedParams
    }
}