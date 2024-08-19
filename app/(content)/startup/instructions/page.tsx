import { TypographyH2, TypographyP } from '@/components/typography'

export default function InstructionsPage() {
  return (
    <main className="mx-auto max-w-[850px] px-8 pt-16 space-y-4 text-justify">
      <TypographyH2 className="text-center">
        Preparado para iniciar o Treinamento Perceptivo-Auditivo da Voz?
      </TypographyH2>
      <TypographyP>
        Antes de iniciar, <b>leia atentamente</b> as orientações à seguir.
      </TypographyP>
      <ul className="list-disc">
        <li>Realize todo o treinamento em um ambiente silencioso.</li>
        <li>
          Use um fone de ouvido, de preferência supra-auricular, durante todo o
          treinamento.
        </li>
        <li>
          Serão realizadas 6 sessões de treinamento, com intervalo de uma semana entre
          elas. Ative o lembrete no celular para não perder a data da próxima sessão! Você
          também receberá um e-mail te lembrando de sua próxima sessão.
        </li>
        <li>
          Em todas as sessões, antes de iniciar o treinamento você deverá realizar o
          ajuste do volume do fone de ouvido, seguindo os comandos da primeira tela do
          treinamento.
        </li>
        <li>
          O treinamento inclui 3 avaliações, para a construção do gráfico da curva de
          aprendizagem. Deste forma, segue a estruturação do treinamento em cada sessão:​
        </li>
        <ul className="list-disc ml-4 my-2">
          <li>Sessão 1 – Avaliação inicial + Treinamento</li>
          <li>Sessão 2 – Treinamento</li>
          <li>Sessão 3 – Treinamento + Avaliação</li>
          <li>Sessão 4 – Treinamento</li>
          <li>Sessão 5 – Treinamento</li>
          <li>Sessão 6 – Treinamento + Avaliação</li>
        </ul>
        <li>
          O treinamento é divido em dois blocos: treino do parâmetro Rugosidade e treino
          do parâmetro Soprosidade. Deverá haver intervalo de 1 dia entre o treino de cada
          parâmetro. O intervalo entre as sessões será de <b>7 dias</b>. Exemplo: Se você
          fez a sessão 1 para Rugosidade dia 02 de agosto e para Soprosidade dia 03 de
          agosto, a sessão 2 será dia 09 de agosto para Rugosidade e 10 de agosto para
          Soprosidade. Lembre-se que na Sessão 6, realizada 7 dias após o treino do último
          parâmetro, Rugosidade e Soprosidade serão treinadas concomitantemente.
        </li>
      </ul>
      <div className="h-[30px]" />
    </main>
  )
}
