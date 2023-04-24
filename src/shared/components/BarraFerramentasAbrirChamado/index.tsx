import {
  Box,
  Icon,
  IconButton,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material'
import React from 'react'

import { BiPlus } from 'react-icons/bi'
import { FaFilter } from 'react-icons/fa'

import { Environment } from '../../environment/export'
import { useNavigate } from 'react-router-dom'

interface IBarraFerramentasAbrirChamado {
  textoBusca?: string
  mostrarInputBusca?: boolean
  aoMudarTextoDeBusca?: (novoTexto: string) => void
  mostrarBotaoNovo?: boolean
  mostrarBotaoFiltro?: boolean
  // aoClicarEmNovo?: (novoTexto: string) => void
}

const BarraFerramentasAbrirChamado: React.FC<IBarraFerramentasAbrirChamado> = ({
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBusca = '',
  mostrarBotaoNovo = true,
  mostrarBotaoFiltro = true,
}) => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={1}
      gap={1}
      height={theme.spacing(5)}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          fullWidth
          placeholder={Environment.INPUT_DE_BUSCA}
          value={textoBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}
      <Box display="flex" flex={1} justifyContent="end">
        {mostrarBotaoNovo && (
          <Tooltip title="Abrir novo chamado" placement="top" arrow>
            <IconButton onClick={() => navigate('/abrir-chamado')}>
              <Icon>
                <BiPlus />
              </Icon>
            </IconButton>
          </Tooltip>
        )}
        {mostrarBotaoFiltro && (
          <Tooltip title="Filtrar" placement="top" arrow>
            <IconButton>
              <Icon>
                <FaFilter size={18} />
              </Icon>
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}

export default BarraFerramentasAbrirChamado
