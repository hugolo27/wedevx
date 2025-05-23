"use client";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { COUNTRIES, VISA_CATEGORIES } from '@/services/constants';

const Banner = styled.div`
  background-color: #d9dea5;
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: #000;
  font-size: 65px;
  font-weight: 1000;
  text-align: left;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 44px;
    min-height: 320px;
    height: auto;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    font-size: 22px;
    min-height: 220px;
    height: auto;
  }
`;

const AlmaText = styled.div`
  font-size: 32px;
  font-weight: 900;
  text-transform: lowercase;
  color: #000;
  margin-bottom: 85px;
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`;

const BannerText = styled.div`
  padding-left: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  position: relative;

  @media (max-width: 1024px) {
    padding-left: 30px;
    height: auto;
  }
  @media (max-width: 768px) {
    padding-left: 34%;
    padding-top: 16px;
    padding-bottom: 16px;
    height: auto;
    font-size: 16px;
    text-align: left;
    align-items: flex-start;
    height: 100%;
    padding-top: 15%;
  }
`;

const BannerMainTextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50%;
  font-size: inherit;

  @media (max-width: 1024px) {
    font-size: 22px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    height: auto;
  }
`;

const BannerImg = styled.img`
  height: 100vh;
  width: auto;
  object-fit: cover;
  display: block;

  @media (max-width: 1024px) {
    height: 220px;
  }
  @media (max-width: 768px) {
    width: 100vw;
    height: 120px;
    margin-bottom: 0;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: auto;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

interface SectionHeaderProps {
  info?: boolean;
  dice?: boolean;
  children: React.ReactNode;
}

const SectionHeader = styled(({ info = false, dice = false, ...rest }: SectionHeaderProps) => <div {...rest} />)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  margin-top: ${props => (props.dice ? '32px' : props.info ? '32px' : '0')};

  h3 {
    color: #000;
    font-size: 22px;
    font-weight: 700;
    margin: 24px 0 0 0;
    text-align: center;
  }
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  width: 100%;

  p {
    margin: 12px 0 0;
    line-height: 1.5;
    font-weight: 700;
    text-align: center;
    margin-bottom: 24px;
    font-size: 18px;
    max-width: 620px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const IconImg = styled.img`
  width: 64px;
  height: 64px;
  display: inline-block;
  vertical-align: middle;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 600px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Field = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.2s;
  font-family: inherit;
  box-sizing: border-box;

  &::placeholder {
    color: #d1d1d1;
  }

  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: none;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  transition: border-color 0.2s;
  font-family: inherit;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: none;
  }

  option {
    padding: 8px;
    font-size: 16px;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  min-height: 180px;
  font-size: 16px;
  width: 100%;
  max-width: 100%;
  resize: vertical;
  transition: border-color 0.2s;
  font-family: inherit;
  box-sizing: border-box;

  &::placeholder {
    color: #d1d1d1;
  }

  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: none;
  }
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 32px;

  &:hover {
    background-color: #333;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ThankYouMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 60px;
  background-color: white;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;

  h2 {
    margin: 24px 0 20px 0;
    color: #000;
    font-size: 28px;
  }

  p {
    margin: 0 0 30px 0;
    line-height: 1.6;
    font-size: 18px;
    color: #000;
    font-weight: 700;
  }
`;

const GoBackButton = styled(SubmitButton)`
  margin-top: 20px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 10px 0;
  border: none;
  border-radius: 0;
  padding: 0;
  align-items: flex-start;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;

  &:hover {
    color: #333;
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #d1d1d1;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  position: relative;

  &:checked {
    background-color: #d1d1d1;
    border-color: #d1d1d1;
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const FileInput = styled.input`
  padding: 12px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  box-sizing: border-box;

  &::placeholder {
    color: #d1d1d1;
  }

  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: none;
  }

  &::file-selector-button {
    padding: 8px 16px;
    margin-right: 16px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 14px;
  margin-top: 4px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const FlexSpacer = styled.div<{flex?: number}>`
  flex: ${props => props.flex || 1};
`;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  country: string;
  selectedVisas: string[];
  resume: File | null;
  additionalInfo: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  linkedin?: string;
  country?: string;
  selectedVisas?: string;
  resume?: string;
  additionalInfo?: string;
}

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    linkedin: '',
    country: '',
    selectedVisas: [],
    resume: null,
    additionalInfo: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.linkedin.trim()) {
      newErrors.linkedin = 'LinkedIn profile is required';
    } else if (!/^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/.test(formData.linkedin)) {
      newErrors.linkedin = 'Please enter a valid LinkedIn profile URL';
    }
    
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    
    if (formData.selectedVisas.length === 0) {
      newErrors.selectedVisas = 'Please select at least one visa category';
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume/CV is required';
    } else if (formData.resume.size > 5 * 1024 * 1024) {
      newErrors.resume = 'File size must be less than 5MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleVisaChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      selectedVisas: prev.selectedVisas.includes(value)
        ? prev.selectedVisas.filter(v => v !== value)
        : [...prev.selectedVisas, value]
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('linkedin', formData.linkedin);
      formDataToSend.append('country', formData.country);
      formData.selectedVisas.forEach(visa => {
        formDataToSend.append('selectedVisas', visa);
      });
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }
      formDataToSend.append('additionalInfo', formData.additionalInfo);

      const response = await fetch('/api/leads', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit form. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Banner>
          <BannerImg src="/banner.png" alt="Banner" />
          <BannerText>
            <AlmaText>
              <Logo src="/alma.png" alt="Alma" />
            </AlmaText>
            <BannerMainTextWrapper>
              Get An Assessment <br /> Of Your Immigration Case
            </BannerMainTextWrapper>
          </BannerText>
        </Banner>
        <FormContainer>
          <ThankYouMessage>
            <IconImg src="/info.png" alt="Information" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Thank You
            </h2>
            <p className="text-lg font-extrabold">
              Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai
            </p>
            <GoBackButton onClick={() => {
              setSubmitted(false);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                linkedin: '',
                country: '',
                selectedVisas: [],
                resume: null,
                additionalInfo: '',
              });
            }}>Go Back to Homepage</GoBackButton>
          </ThankYouMessage>
        </FormContainer>
      </>
    );
  }

  return (
    <>
      <Banner>
        <BannerImg src="/banner.png" alt="Banner" />
        <BannerText>
          <AlmaText>
            <Logo src="/alma.png" alt="Alma" />
          </AlmaText>
          <BannerMainTextWrapper>
            Get An Assessment <br /> Of Your Immigration Case
          </BannerMainTextWrapper>
        </BannerText>
      </Banner>
      <FormContainer>
        <SectionHeader info>
          <IconImg src="/info.png" alt="Information" />
          <h3>Want to understand your visa options?</h3>
        </SectionHeader>
        <InfoSection>
          <p>Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.</p>
        </InfoSection>
        <Form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Field>
              <Input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                aria-required="true"
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              />
              {errors.firstName && <ErrorMessage id="firstName-error">{errors.firstName}</ErrorMessage>}
            </Field>
          </FormGroup>

          <FormGroup>
            <Field>
              <Input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                aria-required="true"
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              />
              {errors.lastName && <ErrorMessage id="lastName-error">{errors.lastName}</ErrorMessage>}
            </Field>
          </FormGroup>

          <FormGroup>
            <Field>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <ErrorMessage id="email-error">{errors.email}</ErrorMessage>}
            </Field>
          </FormGroup>

          <FormGroup>
            <Field>
              <Input
                id="linkedin"
                type="url"
                name="linkedin"
                placeholder="LinkedIn / Personal Website URL"
                value={formData.linkedin}
                onChange={handleInputChange}
                required
                aria-required="true"
                aria-invalid={!!errors.linkedin}
                aria-describedby={errors.linkedin ? 'linkedin-error' : undefined}
              />
              {errors.linkedin && <ErrorMessage id="linkedin-error">{errors.linkedin}</ErrorMessage>}
            </Field>
          </FormGroup>

          <FormGroup>
            <Field>
              <Select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                aria-required="true"
                aria-invalid={!!errors.country}
                aria-describedby={errors.country ? 'country-error' : undefined}
              >
                <option value="">Country of Citizenship</option>
                {COUNTRIES.map(country => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </Select>
              {errors.country && <ErrorMessage id="country-error">{errors.country}</ErrorMessage>}
            </Field>
          </FormGroup>

          <FormGroup>
            <Field>
              <FileInput
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                aria-required="true"
                aria-invalid={!!errors.resume}
                aria-describedby={errors.resume ? 'resume-error' : undefined}
                placeholder="Upload your CV"
              />
              {errors.resume && <ErrorMessage id="resume-error">{errors.resume}</ErrorMessage>}
            </Field>
          </FormGroup>

          <SectionHeader dice>
            <IconImg src="/dice.png" alt="Dice" />
            <h3>Visa categories of interest?</h3>
          </SectionHeader>
          <InfoSection>
            <Field>
              <CheckboxGroup role="group" aria-labelledby="visa-categories">
                {VISA_CATEGORIES.map(category => (
                  <CheckboxLabel key={category.value}>
                    <Checkbox
                      type="checkbox"
                      value={category.value}
                      checked={formData.selectedVisas.includes(category.value)}
                      onChange={() => handleVisaChange(category.value)}
                      aria-label={category.label}
                    />
                    {category.label}
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
              {errors.selectedVisas && <ErrorMessage>{errors.selectedVisas}</ErrorMessage>}
            </Field>
          </InfoSection>

          <SectionHeader>
            <IconImg src="/heart.png" alt="Heart" />
            <h3>How can we help you?</h3>
          </SectionHeader>
          <InfoSection>
            <Field>
              <TextArea 
                id="additionalInfo"
                name="additionalInfo"
                placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?" 
                value={formData.additionalInfo}
                onChange={handleInputChange}
                aria-invalid={!!errors.additionalInfo}
                aria-describedby={errors.additionalInfo ? 'additionalInfo-error' : undefined}
              />
              {errors.additionalInfo && <ErrorMessage id="additionalInfo-error">{errors.additionalInfo}</ErrorMessage>}
            </Field>
          </InfoSection>

          <Field>
            <SubmitButton 
              type="submit" 
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </SubmitButton>
          </Field>
        </Form>
      </FormContainer>
    </>
  );
} 