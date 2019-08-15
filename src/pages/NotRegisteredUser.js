import React, { Fragment, useContext } from 'react'
import { Context } from '../Context'
import { UserForm } from '../components/UserForm'
import { RegisterMutation } from '../container/RegisterMutation'
import { LoginMutation } from '../container/LoginMutation'

export const NotRegisteredUser = () => {
  const { activateAuth } = useContext(Context)
  return (
    <Fragment>
      <RegisterMutation>
        {
          (register, { data, loading, error }) => {
            const onSubmit = ({ email, password }) => {
              const input = { email, password }
              const variables = { input }
              register({ variables })
                .then(response => {
                  const { signup } = response.data
                  activateAuth(signup)
                })
            }
            const errorMsg = error && 'El usuario ya existe o hay algún problema'
            return (
              <UserForm disabled={loading} error={errorMsg} title='Registrarse' onSubmit={onSubmit} />
            )
          }
        }
      </RegisterMutation>
      <LoginMutation>
        {
          (login, { data, loading, error }) => {
            const onSubmit = ({ email, password }) => {
              const input = { email, password }
              const variables = { input }
              login({ variables })
                .then(response => {
                  const { login } = response.data
                  activateAuth(login)
                })
            }
            const errorMsg = error && 'La contraseña no es correcta o el usuario no existe'
            return (
              <UserForm disabled={loading} error={errorMsg} title='Iniciar Sessión' onSubmit={onSubmit} />
            )
          }
        }
      </LoginMutation>
    </Fragment>
  )
}
