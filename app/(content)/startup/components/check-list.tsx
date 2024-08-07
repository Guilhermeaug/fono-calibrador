import { CheckListItem } from './check-list-item'

const items = [
  {
    text: '1. Termo de Consentimento Livre e Esclarecido',
    href: '/terms',
    done: true,
  },
  {
    text: '2. Teste do Processamento Auditivo',
    href: '/pac/begin',
    done: true,
  },
  {
    text: '3. Treinamento de Avaliação Perceptivo-Auditiva da Voz',
    href: '',
    done: false,
  },
  { text: '4. Teste do Processamento Auditivo', href: '', done: false },
  { text: 'Resultados', href: '', done: false },
]

export function CheckList() {
  return (
    <div className="grid list-none place-content-center gap-2">
      {items.map((item, index) => (
        <CheckListItem key={index} {...item} />
      ))}
    </div>
  )
}
