// ============================================================
//  Marcas / projetos: edita aqui.
//  logo: coloca a imagem em public/marcas/ e escreve o caminho,
//        ex.: "marcas/bila.png". Sem logo aparece um monograma.
//  site: link para o site (deixa "" enquanto não estiver online).
// ============================================================

export type Brand = {
  name: string
  work: string
  description: string
  logo: string
  site: string
  color: string
  foreground?: string
  linkColor?: string
  status?: string
}

export const brands: Brand[] = [
  {
    name: "Bila d'Coração",
    work: "Loja de decoração · site",
    description:
      "Site para uma loja de decoração com alma: mostrar as peças e aproximar a loja de quem ainda não a conhece.",
    logo: "marcas/bila.webp",
    site: "https://biladcoracao.pt/",
    color: "#3b2b96",
    status: "Publicado",
  },
  {
    name: "Romaria da Nossa Senhora da Pena",
    work: "Romaria · site",
    description:
      "Uma festa que atravessa gerações, agora com um lugar onde a fé, as memórias e a história da romaria ficam guardadas, para que continue viva no coração de quem a sente, mesmo de quem está longe.",
    logo: "marcas/romaria.jpeg",
    site: "",
    color: "#f2e7d2",
    foreground: "#30291f",
    linkColor: "#80603a",
    status: "em curso",
  },
]
