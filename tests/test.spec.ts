import { test, expect } from '@playwright/test';
let page: any;

// locators of the web elements

let dropdownId='#dropdown-class-example'; 

test.describe('Automate the practise page', () => {
test.beforeAll(async ({ browser }) => {

const context = await browser.newContext();
page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
await expect(page).toHaveTitle(/Practice Page/);
await expect(page.locator('h1')).toHaveText('Practice Page');
});

test('automate practise page', async ({  }) => {

  // verify the radio buttons
  await expect(page.locator('#radio-btn-example legend')).toBeVisible();
  await expect(page.locator('#radio-btn-example legend')).toHaveText('Radio Button Example');
  await expect(page.locator('#radio-btn-example input[type="radio"][value="radio1"]')).not.toBeChecked();

  await page.locator('#radio-btn-example input[type="radio"][value="radio1"]').check();
  await expect(page.locator('#radio-btn-example input[type="radio"][value="radio1"]')).toBeChecked();

})

test('suggestion class example', async ({  }) => {

// verify title of web element
await expect(page.getByText('Switch Window Example')).toBeVisible();
await expect(page.getByText('Switch Window Example')).toHaveText('Switch Window Example');


// verify the dropdown
await expect(page.locator('#autocomplete')).toBeVisible();
await expect(page.locator('#autocomplete')).toHaveAttribute('placeholder', 'Type to Select Countries');

//fill text in the field
await page.locator(`#autocomplete`).fill("Ind")
await page.waitForTimeout(2000);

//verify an option and select India
let Option= await page.locator('.ui-menu-item-wrapper').nth(1).textContent();
await expect(page.locator('.ui-menu-item-wrapper').nth(1)).toBeVisible();
expect(Option=='India').toBeTruthy();
await page.locator('.ui-menu-item-wrapper').nth(1).click();
await expect(page.locator('#autocomplete')).toHaveValue('India');

//again click on the field and clear the text
await page.locator(`#autocomplete`).clear();
await expect(page.locator(`#autocomplete`)).toHaveValue('');
await page.locator(`#autocomplete`).type('United');
await page.waitForTimeout(2000);
await page.locator('.ui-menu-item-wrapper', { hasText: 'United States (USA)' }).click()
await page.waitForTimeout(2000);

})

test('handling dropdowns', async({ })=>{

// verify title of web element
  let dropdownValue = await page.locator(dropdownId).textContent();
  await expect(page.locator(dropdownId)).toBeVisible();
  expect(dropdownValue).toContain('Select');


  //select option by value
  await page.locator(dropdownId).selectOption({ label: 'Option1' });
  
})

test('handling switch windows', async({})=>{
// const [newPage] = await Promise.all([
//   page.waitForEvent('popup'),
//   page.locator('button[onclick="openWindow()"]').click()
// ]);

const promiseNewEvent = page.waitForEvent('popup')
page.locator('button[onclick="openWindow()"]').click()
const newPage = await promiseNewEvent;
await newPage.waitForLoadState();
await expect(newPage).toHaveTitle(/QAClick Academy - A Testing Academy to Learn, Earn and Shine/);
await newPage.getByText('Access all our Courses').click()
await expect(newPage).toHaveTitle(/QAClick Academy | Corporate Trainings from Professionals | Udemy/);

await newPage.goBack();
await expect(newPage).toHaveTitle(/QAClick Academy - A Testing Academy to Learn, Earn and Shine/);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await newPage.close();
})



test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

// open new tab
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Open Tab' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('listitem').filter({ hasText: /^info@qaclickacademy\.com$/ }).locator('span').click();
  await page1.getByRole('link', { name: 'Access all our Courses' }).click();
  await page1.getByRole('heading', { name: 'QA Click Academy' }).click();
  await page1.close();
  await expect(page.locator('#radio-btn-example legend')).toBeVisible();
});

test.only('handling browser alerts', async({})=>{ 

  function text(){
    return "SAP"
  } 
 
   expect( await page.getByRole('textbox', { name: 'Enter Your Name' })).toBeVisible(); 
     await page.getByRole('textbox', { name: 'Enter Your Name' }).fill(text())

     
    //  await page.getByRole('textbox', { name: 'Enter Your Name' }).toHaveValue(text());
// const [dialog] = await Promise.all([
//   page.waitForEvent('dialog'),             // start listening
//   page.locator('#alertbtn').click()        // trigger alert, no await here
// ]);

// expect(dialog.message()).toBe(
//   "Hello SAP, share this practice page and share your knowledge"
// );
// await dialog.accept();


 // Add listener before clicking
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe("Hello " + text() + ", share this practice page and share your knowledge");
    await dialog.accept();
  });

  // Trigger the alert
  await page.locator('#alertbtn').click();




  
  

})

});