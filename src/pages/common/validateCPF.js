export default (strCPF) => {
    var soma
    var rest
    soma = 0
  if (strCPF === '00000000000') return false

    for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
    rest = (soma * 10) % 11

    if ((rest === 10) || (rest === 11)) rest = 0
    if (rest !== parseInt(strCPF.substring(9, 10))) return false

    soma = 0
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
    rest = (soma * 10) % 11

    if ((rest === 10) || (rest === 11)) rest = 0
    if (rest !== parseInt(strCPF.substring(10, 11))) return false
    return true
}
