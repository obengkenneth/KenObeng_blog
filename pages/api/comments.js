// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql } from "graphql-request"

const endpoint = 'https://api-eu-west-2.hygraph.com/v2/clgxma3j210bx01um8e364mgz/master';
const graphcmsToken = process.env.MY_TOKEN;
// const MY_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODMyMDMyNTEsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2xneG1hM2oyMTBieDAxdW04ZTM2NG1nei9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNzk3YzMxMDAtY2I0OC00YzRhLTgxYTUtYjUzZTIxZWJhYzM2IiwianRpIjoiY2xoOTNyOTVtMGIyYjAxdWYydnlrYTE5NCJ9.VfsBJwkxd5P7XYUSiiQj6-FjXncJcpgvjUQxZM2nfTFFydIxKzAd3nJQdJZArYYXSamP-ZD0t4oXIHjiEhjYoNr7NWT58FQUloX1nPAbKR_5MQbfYYZjDICcreb-RLI7W5ZHUDMm1q9joRgM7vgZF7dDsO_XXohp-I6cxsTC6LkaIGcAqmKOdaq70GugsRsPgulT-3SARNH17G5L3_2X7G1HnG6NzDJLC-GZCDS7s9OQnwuzOWwW7oApljRReeYrwMCZ6G3bKGeizunw-7Eqgf9qp0La0nPdNWIxgGVBI7pRmz2LfCnkVNsZxLMsxmjU2C-ogmNWK9jdD1U_krD5ikRNi-DJHf38m_vhPjt4QlQbwm1siXAcJkULCgM9rTMNRRmsm3sM7dU5d7xP-R6GNYMIC4RiLHZCT46gLAeykrLlSvsHx_WawoENLcRdDtN7Kb7ZSKazXkYNqmbtY5bxLY--OBDQodGEPRi23YlUGbBBELt3fBY39ygcO8H0Pvz-I8BOZx_riTxdSAKk68P1h50ovbPHgSgaTdSoX1A-a7qiT86E6xg_WThzL75kRAX7H2uohfNvpmgTr1cboP22MsjW7uSsLE9sijJi7pfH7U6UodZansJlBD61N_s_bvOXh8XxYvNmOuBwhxA_WoEPobzFDQdR1ZSd7DpyDN_a9jU'


export default async function comments(req, res) {
  console.log({graphcmsToken})
  const { name, email, slug, comment } = req.body;
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${graphcmsToken}`,
    },
  })

  const query = gql `
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) (
      createComment(data: {name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } }}) { id }
    )
  `
  try {
    
    const result = await graphQLClient.request(query, req.body)
  
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
