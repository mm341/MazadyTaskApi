/** Hook for zod validation */
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
// import {ZodRawShape} from "zod/lib/types";
import {useForm} from "react-hook-form";

export const useZod = <T>(
    schema: any,
    defaultValues: any,
    onFormSubmit: (validatedData: any) => any,
) => {
    const {
        watch,
        control,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
        getValues,
    } = useForm({
        resolver: zodResolver(z.object(schema)),
        defaultValues,
    });

    return {
        watch,
        reset,
        setValue,
        getValues,
        errors,
        control,
        onSubmit: handleSubmit(d => onFormSubmit(d as T)),
    };
};
