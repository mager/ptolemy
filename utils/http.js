export const errorResponse = (res, code, message) => {
    return res.status(code).send({
        status: "error",
        message: message,
    });
};

// TODO: Fix any type
export const successResponse = (
    res,
    data,
) => {
    return res.status(200).send(data);
};
