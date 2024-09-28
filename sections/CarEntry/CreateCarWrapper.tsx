import {Field, Form, FormRenderProps, SupportedInputs} from 'react-final-form';
import {ValidationErrors} from 'final-form';
import {useCallback} from 'react';
import {useGetMakes} from "@/sections/CarEntry/service";
import {FormDropdown} from "@/components/Forms/Dropdown/FormDropdown";

interface PersonalInfoForm {
    makeId: number;
}

export interface PersonalInfoProps extends FormRenderProps<PersonalInfoForm> {
}

const PersonalInfo = (props: PersonalInfoProps) => {
    const {handleSubmit} = props;
    const {data, isLoading} = useGetMakes();

    return <form id="car-entry" onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-gap-4">
        <Field
            name="makeId"
            component={FormDropdown as unknown as SupportedInputs}
            placeholder='Marca'
            label='Marca'
            loading={isLoading}
            autoFocus={true}
            options={data}
        />
    </form>
}

export const CreateCarWrapper = () => {
    const onSubmit = useCallback((data: PersonalInfoForm) => {
        console.log('HELLO MOTO', data)
    }, []);

    const validate = useCallback(async (data: PersonalInfoForm) => {
        console.log('HELLO MOTO', data)
        const errors: Partial<PersonalInfoForm> = {};
        return errors as ValidationErrors;
    }, []);

    return (<Form
        initialValues={{
            makeId: undefined
        }}
        onSubmit={onSubmit}
        validate={validate}
        validateOnBlur={true}
    >
        {(formProps) => <PersonalInfo {...formProps} />}
    </Form>);
};
