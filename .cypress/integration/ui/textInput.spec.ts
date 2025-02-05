context('Primitives/TextInput', () => {
  it('readonly input should not have focus styling', async () => {
    cy.visit('http://localhost:9009/iframe.html?id=atoms-textinput--read-only&viewMode=story')

    cy.get('#text-input-example').click()

    cy.get('#text-input-example + span').should(
      'have.css',
      'boxShadow',
      'rgb(182, 188, 198) 0px 0px 0px 1px inset'
    )
  })
})
