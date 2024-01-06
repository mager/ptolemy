export const errorResponse = (res, code, message) => {
    return res.status(code).send({
        status: "error",
        message: message,
    });
};

export const successResponse = (
    res,
    resp,
) => res.status(200).send(resp);
