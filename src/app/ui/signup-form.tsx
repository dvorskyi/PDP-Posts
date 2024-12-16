"use client";

import { signup } from '@/app/actions/auth';
import { useActionState } from 'react';
import { Form, FormGroup, ErrorText, Button, PasswordErrorList, CenteredContainer } from './styled-components';

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined);

    return (
        <CenteredContainer>
            <Form action={action}>
                <FormGroup>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" placeholder="Name" />
                    {state?.errors?.name && <ErrorText>{state.errors.name}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="Email" />
                    {state?.errors?.email && <ErrorText>{state.errors.email}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" />
                    {state?.errors?.password && (
                        <div>
                            <ErrorText>Password must:</ErrorText>
                            <PasswordErrorList>
                                {state.errors.password.map((error) => (
                                    <li key={error}>- {error}</li>
                                ))}
                            </PasswordErrorList>
                        </div>
                    )}
                </FormGroup>
                <Button disabled={pending} type="submit" aria-label="Sign Up">
                    Sign Up
                </Button>
            </Form>
        </CenteredContainer>
    );
}
