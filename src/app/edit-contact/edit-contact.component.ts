import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contactServ: ContactsService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  contactForm = this.fb.nonNullable.group({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth:<Date | null>(null),
    favoritesRanking:<number | null>(null),
    phone: this.fb.nonNullable.group({
      phoneNumber: <string | undefined>(''),
      phoneType: <string | undefined>('')
    }),
    address: this.fb.nonNullable.group({
      streetAddress: <string | undefined>(''),
      city: <string | undefined>(''),
      state: <string | undefined>(''),
      postalCode: <string | undefined>(''),
      addressType: <string | undefined>('')
    })
  })

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactServ.getContact(contactId).subscribe((contact) => {
      if(!contact) return
      // this.contactForm.controls.id.setValue(contact?.id)
      // this.contactForm.controls.firstName.setValue(contact?.firstName)
      // this.contactForm.controls.lastName.setValue(contact?.lastName)
      // this.contactForm.controls.dateOfBirth.setValue(contact?.dateOfBirth)
      // this.contactForm.controls.favoritesRanking.setValue(contact?.favoritesRanking)
      // this.contactForm.controls.phone.controls.phoneNumber.setValue(contact?.phone.phoneNumber)
      // this.contactForm.controls.phone.controls.phoneType.setValue(contact?.phone.phoneType)
      // this.contactForm.controls.address.controls.streetAddress.setValue(contact?.address.streetAddress)
      // this.contactForm.controls.address.controls.city.setValue(contact?.address.city)
      // this.contactForm.controls.address.controls.state.setValue(contact?.address.state)
      // this.contactForm.controls.address.controls.postalCode.setValue(contact?.address.postalCode)
      // this.contactForm.controls.address.controls.addressType.setValue(contact?.address.addressType)
      
      // we can setValue of all the form control using a single line of code
      this.contactForm.patchValue(contact)
      
      // const names = {firstName: contact.firstName, lastName: contact.lastName}
      // this.contactForm.patchValue(names)
      

    })
  }



  saveContact() {
    // console.log(this.contactForm.value)
    // console.log(this.contactForm.controls.firstName.value)
    // console.log(this.contactForm.controls.lastName.value)
    // console.log(this.contactForm.controls.dateOfBirth.value)
    // console.log(this.contactForm.controls.favoritesRanking.value)

    this.contactServ.saveContact(this.contactForm.value).subscribe(()=>{
      this.router.navigate(['/contacts'])
  })
}

}
