import React from 'react'
import { ZodError } from 'zod';
import ErrorToast from './ErrorToast';
import NotFound from './NotFound';

type Props = {
    error: unknown,
    place: string,
    children?: React.ReactNode
} & (TrueNotFoundProps | FalseNotFoundProps)

type TrueNotFoundProps = {
    notFound?: true,
    goBack: boolean,
}

type FalseNotFoundProps = {
    notFound?: false,
}

export default function ErrorHandler(props: Props) {

    console.log(props.error)

    if (props.error instanceof ZodError) {

        return <ErrorToast error={props.error.issues} place={props.place} />;

    } else {

        if (props.notFound) {
            if ((props.error as Error).message === 'NEXT_NOT_FOUND') {

                return (
                    <NotFound goBack={props.goBack}>
                        {props.children}
                    </NotFound>
                )
            
            } else return <ErrorToast error={(props.error as Error).message} place={props.place} />
        } else return null

    }
}
