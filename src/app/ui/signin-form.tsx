"use client";

import { signin } from '@/app/actions/auth';
import { useActionState } from 'react';
import { Form, FormGroup, ErrorText, Button, CenteredContainer } from './styled-components';
export function SigninForm() {
    const [state, action, pending] = useActionState(signin, undefined)

    return (
        <CenteredContainer>
            <Form action={action}>
                <FormGroup>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" placeholder="Username" />
                    {state?.errors?.name && <ErrorText>{state.errors.name}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" />
                    {state?.errors?.password && <ErrorText>{state.errors.password}</ErrorText>}
                </FormGroup>
                {state?.message && <ErrorText>{state.message}</ErrorText>}
                <Button type="submit" disabled={pending} aria-label="Sign In">Sign In</Button>
            </Form>
        </CenteredContainer>
    )
}